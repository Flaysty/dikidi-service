import { combineReducers } from 'redux'

import auth from './auth'
import flashMessages from './flashMessages'
import api from './api'

export default combineReducers({
    flashMessages,
    auth,
    api
})