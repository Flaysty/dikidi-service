import axios from 'axios';

import { ADD_DIKIDI_STUDIO, REMOVE_DIKIDI_STUDIO } from './types'

export function addStudioLine(studio) {
    return {
        type: ADD_DIKIDI_STUDIO,
        studio
    }
}

export function removeStudioLine(id) {
    return {
        type: REMOVE_DIKIDI_STUDIO,
        id
    }
}

export function addStudio(data) {
    return dispatch => {
        return axios.post('http://localhost:3400/user/studios', data)
            .then(({ data: { error, studio } }) => {
                if (!error) {
                    dispatch(addStudioLine(studio))
                    return new Promise((resolve) => {
                        resolve({ ok: true })
                    });
                }
                else {
                    return new Promise((resolve) => {
                        resolve({ ok: false, error })
                    });
                }
            })
    }
}

export function deleteStudio(id) {
    return dispatch => {
        return axios.delete('http://localhost:3400/user/studios', { params: { id } })
            .then(({ data: { error } }) => {
                if (!error) {
                    dispatch(removeStudioLine(id))
                    return new Promise((resolve) => {
                        resolve({ ok: true })
                    });
                }
                else {
                    return new Promise((resolve) => {
                        resolve({ ok: false, error })
                    });
                }
            })
    }
}