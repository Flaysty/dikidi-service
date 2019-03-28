import { FETCH_DIKIDI_STUDIOS, ADD_DIKIDI_STUDIO, RESET } from '../actions/types'

export default function(state = [], action = {}) {
    switch(action.type) {
        case FETCH_DIKIDI_STUDIOS: 
            return [
                ...action.studio,
            ];
        case ADD_DIKIDI_STUDIO: 
            return state.concat(action.studio);
        case RESET:
            return [];
        default: return state;
    }
}