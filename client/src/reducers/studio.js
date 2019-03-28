import { FETCH_DIKIDI_STUDIOS, ADD_DIKIDI_STUDIO, RESET, REMOVE_DIKIDI_STUDIO } from '../actions/types'
import findIndex from 'lodash/findIndex'

export default function(state = [], action = {}) {
    switch(action.type) {
        case FETCH_DIKIDI_STUDIOS: 
            return [
                ...action.studio,
            ];
        case ADD_DIKIDI_STUDIO: 
            return state.concat(action.studio);
        case REMOVE_DIKIDI_STUDIO: 
            const index = findIndex(state, { id: action.id });
            if (index >=  0) {
                return [
                    ...state.slice(0, index),
                    ...state.slice(index + 1)
                ]
            }
            return state;
        case RESET:
            return [];
        default: return state;
    }
}