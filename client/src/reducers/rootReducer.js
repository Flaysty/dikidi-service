import { combineReducers } from 'redux'

import auth from './auth'
import flashMessages from './flashMessages'
import api from './api'
import studio from './studio'
import option from './option'

export default combineReducers({
    flashMessages,
    auth,
    api,
    studio,
    option,
})