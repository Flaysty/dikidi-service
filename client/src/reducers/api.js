import findIndex from 'lodash/findIndex'

import { ADD_DIKIDI_ACCOUNT, FETCH_DIKIDI_ACCOUNT, RESET, REMOVE_DIKIDI_ACCOUNT } from '../actions/types'

export default function(state = { accounts: [] }, action = {}) {
    switch(action.type) {
        case ADD_DIKIDI_ACCOUNT: 
            return {
                ...state,
                accounts: state.accounts.concat(action.account)
            };
        case REMOVE_DIKIDI_ACCOUNT:
            const index = findIndex(state.accounts, { id: action.id });
            if (index >=  0) {
                return {
                    ...state,
                    accounts: [
                        ...state.accounts.slice(0, index),
                        ...state.accounts.slice(index + 1)
                    ]
                };
            }
            return state;
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