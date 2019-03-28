import axios from 'axios';

import { ADD_DIKIDI_ACCOUNT, FETCH_DIKIDI_ACCOUNT, FETCH_DIKIDI_STUDIOS } from './types';

export function addAccountLine(account) {
    return {
        type: ADD_DIKIDI_ACCOUNT,
        account
    }
}

export function displayAccounts(accounts) {
    return {
        type: FETCH_DIKIDI_ACCOUNT,
        accounts
    }
}

export function displayStudios(studio) {
    return {
        type: FETCH_DIKIDI_STUDIOS,
        studio
    }
}

export function fetchAccounts() {
    return dispatch => {
        return axios.get('http://localhost:3400/user/accounts')
            .then(({ data }) => {
                if (!data.error) {
                    dispatch(displayAccounts(data))
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

export function fetchStudios() {
    return dispatch => {
        return axios.get('http://localhost:3400/user/studios')
            .then(({ data }) => {
                if (!data.error) {
                    dispatch(displayStudios(data))
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