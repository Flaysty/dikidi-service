import apiController from '../controllers/api.controller.js'
import authenticated from '../middlewares/authenticated'

module.exports = (app) => {
    app.route('/api/authenticate')
        .post(authenticated, apiController.authenticate)
    app.route('/api/company')
        .get(authenticated, apiController.getCompaniesList)
}