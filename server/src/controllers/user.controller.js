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