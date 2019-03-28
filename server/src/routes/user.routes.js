import userController from '../controllers/user.controller.js'
import authenticated from '../middlewares/authenticated'

module.exports = (app) => {
    app.route('/user')
        .get(authenticated, userController.userInfo)
    app.route('/user/register')
        .post(userController.signup)
    app.route('/user/login')
        .post(userController.signin)
    app.route('/user/accounts')
        .get(authenticated, userController.getAccountsList)
}