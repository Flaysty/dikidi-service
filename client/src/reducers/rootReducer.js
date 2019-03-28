import { combineReducers } from 'redux'

import auth from './auth'
import flashMessages from './flashMessages'
import api from './api'
import studio from './studio'

export default combineReducers({
    flashMessages,
    auth,
    api,
    studio,
})