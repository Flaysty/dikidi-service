import axios from 'axios';

import { ADD_DIKIDI_ACCOUNT } from './types';

export function addAccountLine(account) {
    return {
        type: ADD_DIKIDI_ACCOUNT,
        account
    }
}

export function authorizeAccount(accountData) {
    return dispatch => {
        return axios.post('http://localhost:3400/api/authenticate', accountData)
            .then(({ data: { error, account } }) => {
                if (!error) {
                    dispatch(addAccountLine(account))
                    return new Promise((resolve) => {
                        resolve({ ok: true })
                    });
                }
                else {
                    return new Promise((resolve) => {
                        resolve({ ok: false, error: error })
                    });
                }
            })
    }
}

export function getStudios(token) {
    return dispatch => {
        return axios.get(`http://localhost:3400/api/company?token=${token}`)
            .then(({ data }) => {
                if (!data.length > 0) {
                    return new Promise((resolve) => {
                        resolve({ ok: true, studios: data})
                    });
                }
                else {
                    return new Promise((resolve) => {
                        resolve({ ok: false, error: 'Что-то пошло не так' })
                    });
                }
            })
    }
}