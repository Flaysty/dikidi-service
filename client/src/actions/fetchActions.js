import axios from 'axios';

import { ADD_DIKIDI_ACCOUNT } from './types';

export function addAccountLine(account) {
    return {
        type: ADD_DIKIDI_ACCOUNT,
        account
    }
}

export function fetchAccounts() {
    return dispatch => {
        return axios.get('http://localhost:3400/user/accounts')
            .then(({ data }) => {
                if (!data.error) {
                    dispatch(addAccountLine(data))
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