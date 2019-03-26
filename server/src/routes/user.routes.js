import userController from '../controllers/user.controller.js'

module.exports = (app) => {
    app.route('/user')
        .get(userController.userInfo)
    app.route('/user/register')
        .post(userController.signup)
    app.route('/user/login')
        .post(userController.signin)
}