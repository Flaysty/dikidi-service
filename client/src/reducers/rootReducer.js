import { combineReducers } from 'redux'

import auth from './auth'
import flashMessages from './flashMessages'

export default combineReducers({
    flashMessages,
    auth
})