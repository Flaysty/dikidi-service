import axios from 'axios';

import { REMOVE_DIKIDI_ACCOUNT } from './types'

export function removeAccountLine(id) {
    return {
        type: REMOVE_DIKIDI_ACCOUNT,
        id
    }
}

export function deleteAccount(id) {
    return dispatch => {
        return axios.delete('http://localhost:3400/user/accounts', { params: { id } })
            .then(({ data: { error } }) => {
                if (!error) {
                    dispatch(removeAccountLine(id))
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