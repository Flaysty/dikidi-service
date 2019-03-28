import { FETCH_DIKIDI_STUDIOS } from '../actions/types'

export default function(state = [], action = {}) {
    switch(action.type) {
        case FETCH_DIKIDI_STUDIOS: 
            return [
                ...action.studio,
            ];
        default: return state;
    }
}