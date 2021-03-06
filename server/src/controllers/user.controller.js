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

exports.deleteStudio = async (req, res) => {
    const response = await models.Studio.destroy({ where: { id: req.query.id } });
    if (response) {
        return res.status(200).send({
            message: 'Studio deleted',
            id: response,
        });
    }
    else {
        return res.status(200).send({ error: `Не удалось удалить студию ${req.query.id}` });
    }
}

exports.deleteAccount = async (req, res) => {
    const studios = await models.Studio.destroy({ where: { accountId: req.query.id } });
    const response = await models.Account.destroy({ where: { id: req.query.id } });
    console.log(studios)
    if (response && studios) {
        return res.status(200).send({
            message: 'Account deleted',
            id: response,
        });
    }
    else {
        return res.status(200).send({ error: `Не удалось удалить аккант ${req.query.id}` });
    }
}

exports.getStudioOptions = async (req, res) => {
    const result = await models.Option.findAll({ where: { studioId: req.query.id } })
    return res.status(200).send({
        options: result
    });
}

exports.addStudioOptions = async (req, res) => {
    try {
        const { days, when, text, studioId } = req.body;
        const optionTime = days == 0 ? null : when;
        const result = await models.Option.create({
            counter: 0,
            days,
            when: optionTime,
            state: true,
            text,
            studioId,
        });
        return res.status(200).send({
            message: 'Option saved',
            option: result,
        });
    } catch (err) {
        console.log(err)
        return res.status(400).send({
            error: formatErrors(err, models),
        });
    }
}

exports.editStudioOptions = async (req, res) => {
    try {
        const { id, days, when, text, state, studioId } = req.body;
        const optionTime = days == 0 ? null : when;
        const result = await models.Option.update(
            {
                days,
                when: optionTime,
                state,
                text,
                studioId,
            },
            {
                where: { id, studioId }
            }
        );
        const option = await models.Option.findOne({ where: { id } });
        return res.status(200).send({
            message: 'Option edited',
            option,
        });
    } catch (err) {
        console.log(err)
        return res.status(400).send({
            error: formatErrors(err, models),
        });
    }
}

exports.deleteStudioOption = async (req, res) => {
    const response = await models.Option.destroy({ where: { id: req.query.id } });
    if (response) {
        return res.status(200).send({
            message: 'Option deleted',
            id: response,
        });
    }
    else {
        return res.status(200).send({ error: `Не удалось удалить студию ${req.query.id}` });
    }
}