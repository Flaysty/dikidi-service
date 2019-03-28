import findIndex from 'lodash/findIndex'

import { ADD_DIKIDI_ACCOUNT, FETCH_DIKIDI_ACCOUNT, RESET } from '../actions/types'

export default function(state = { accounts: [] }, action = {}) {
    switch(action.type) {
        case ADD_DIKIDI_ACCOUNT: 
            return {
                ...state,
                accounts: state.accounts.concat(action.account)
            };
        case FETCH_DIKIDI_ACCOUNT: 
            return {
                ...state,
                accounts: action.accounts
            };
        case RESET:
            return { accounts: [] };
        default: return state;
    }
}