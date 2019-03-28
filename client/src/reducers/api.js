import { ADD_DIKIDI_ACCOUNT } from '../actions/types'

export default function(state = { accounts: [] }, action = {}) {
    switch(action.type) {
        case ADD_DIKIDI_ACCOUNT: 
            return {
                ...state,
                accounts: state.accounts.concat(action.account)
            };
        default: return state;
    }
}