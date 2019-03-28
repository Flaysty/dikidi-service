import fetch from 'node-fetch'

import models from '../models'
import formatErrors from '../formatErrors'

exports.authenticate = async (req, res) => {
    try {
        const { login, password, apiKey } = req.body;
        const response = await fetch('https://login.dikidi.ru/api/user/authorization/', {
            method: 'POST',
            body: `login=${login}&password=${password}`,
            headers: {
                'authorization': apiKey,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        const { error, data, message } = await response.json();
        if (error) {
            return res.status(401).json({
                error,
                message
            });
        }
        const exists = await models.Account.findOne({ where: { uid: data.user_id } });
        if (!exists) {
            const account = await models.Account.create({
                uid: data.user_id,
                username: login,
                name: data.name,
                password: password,
                token: data.token,
                userId: req.user.id
            });
            return res.status(200).send({
                message: 'Account successfully authorized',
                account
            })
        }
        return res.status(401).json({
            message: 'Error',
            errors: 'You have already authorized this account'
        });
        
    } catch (error) {
        return res.status(400).send({
            message: 'Error',
            errors: formatErrors(error, models),
        });
    }
}