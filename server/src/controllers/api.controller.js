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
            return res.status(200).json({
                error: message
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
                userId: req.user.id,
                pKey: req.body.apiKey
            });
            return res.status(200).send({
                message: 'Account successfully authorized',
                account
            })
        }
        return res.status(200).json({
            message: 'Error',
            error: 'Вы уже авторизовали этот аккаунт ранее'
        });
        
    } catch (error) {
        return res.status(400).send({
            message: 'Error',
            error: formatErrors(error, models),
        });
    }
}

exports.getCompaniesList = async (req, res) => {
    try {
        const { token } = req.query;
        const response = await fetch(`https://beauty.dikidi.ru/api/owner/user/projects/?token=${token}`, {
            method: 'GET',
        });
        const { error, data, message } = await response.json();
        if (error > 0) {
            return res.status(400).json({
                error,
                message
            });
        }
        return res.status(200).send({
            message: 'List of companies',
            data
        })
    } catch (error) {
        return res.status(400).send({
            message: 'Error',
            ...error,
        });
    }
}