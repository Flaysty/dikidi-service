import fetch from 'node-fetch'

import models from '../models'
import formatErrors from '../formatErrors'
import { tryLogin } from '../auth'
import { SECRET, SECRET2 } from '../config'

exports.userInfo = async (req, res) => {
    return res.status(200).send({
        user: req.user
    })
}

exports.signup = async (req, res) => {
    try {
        const user = await models.User.create({
            username: req.body.username,
            password: req.body.password,
        });
        return res.status(200).send({
            message: 'Async Register function',
            user,
        });
    } catch (err) {
        return res.status(400).send({
            message: 'Error',
            errors: formatErrors(err, models),
        });
    }
};

exports.signin = async (req, res) => {
    const result = await tryLogin(req.body.username, req.body.password, models, SECRET, SECRET2);
    return res.status(200).send(result);
}

exports.getAccountsList = async (req, res) => {
    const result = await models.Account.findAll({ where: { userId: req.user.id } })
    return res.status(200).send(result);
}

exports.addStudio = async (req, res) => {
    try {
        const { account_id, studio, studioKey } = req.body;
        const account = await models.Account.findOne({ where: { uid: account_id } });
        if (account) {
            const response = await fetch(`https://beauty.dikidi.ru/api/partner/auth/?pKey=${account.pKey}&token=${studioKey}`, {
                method: 'GET',
                headers: {
                    'authorization': account.pKey,
                }
            });
            const studioObj = JSON.parse(studio);
            const { error, data } = await response.json();
            if (error.code === 0) {
                if (studioObj.id == data.company) {
                    const result = await models.Studio.create({
                        sid: studioObj.id,
                        name: studioObj.name,
                        address: studioObj.address,
                        image: studioObj.image,
                        intKey: studioKey,
                        accountId: account.id,
                        userId: req.user.id
                    });
                    return res.status(200).send({
                        message: 'Studio saved',
                        studio: result,
                    });
                }
                return res.status(200).send({ error: 'Не удалось активировать ключ интеграции' });
            }
        }
        return res.status(200).send({ error: 'Не удалось найти аккаунт dikidi' });
    } catch (err) {
        return res.status(400).send({
            error: formatErrors(err, models),
        });
    }
}

exports.getStudios = async (req, res) => {
    const result = await models.Studio.findAll({ where: { userId: req.user.id } })
    return res.status(200).send(result);
}