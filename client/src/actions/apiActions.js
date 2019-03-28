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