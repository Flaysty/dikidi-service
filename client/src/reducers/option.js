import { ADD_STUDIO_OPTION, RESET, FETCH_STUDIO_OPTIONS, UPDATE_STUDIO_OPTIONS, DELETE_STUDIO_OPTION } from '../actions/types'
import findIndex from 'lodash/findIndex'

export default function(state = [], action = {}) {
    switch(action.type) {
        case ADD_STUDIO_OPTION: 
            return state.concat(action.option);
        case FETCH_STUDIO_OPTIONS: 
            return [...action.options];
        case DELETE_STUDIO_OPTION: 
            const deleteIndex = findIndex(state, { id: action.id });
            if (deleteIndex >=  0) {
                return [
                    ...state.slice(0, deleteIndex),
                    ...state.slice(deleteIndex + 1)
                ]
            }
            return state;
        case UPDATE_STUDIO_OPTIONS:
            const index = findIndex(state, { id: action.option.id });
            if (index >=  0) {
                return [
                    ...state.slice(0, index),
                    action.option,
                    ...state.slice(index + 1)
                ]
            }
            return state;
        case RESET:
            return [];
        default: return state;
    }
}