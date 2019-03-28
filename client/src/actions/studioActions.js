import axios from 'axios';

export function addStudioLine(account) {
    return {
        type: ADD_DIKIDI_ACCOUNT,
        account
    }
}

export function addStudio(data) {
    return dispatch => {
        return axios.post('http://localhost:3400/user/studios', data)
            .then(({ data: { error, studio } }) => {
                if (!error) {
                    dispatch(addAccountLine(account))
                    return new Promise((resolve) => {
                        resolve({ ok: true, studio })
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