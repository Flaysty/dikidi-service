import axios from 'axios';
import jwt from 'jsonwebtoken'

import setAuthorizationToken from '../utils/setAuthorizationToken'
import { SET_CURRENT_USER } from './types'

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        ...user
    }
}

export function userLoginRequest(userData) {
    return dispatch => {
        return axios.post('http://localhost:3400/user/login', userData)
            .then(({ data: { ok, errors, token, refreshToken } }) => {
                if (ok) {
                    localStorage.setItem('token', token);
                    localStorage.setItem('refreshToken', refreshToken);
                    setAuthorizationToken(token, refreshToken);
                    dispatch(setCurrentUser(jwt.decode(token)))
                    return new Promise((resolve) => {
                        resolve({ ok: true })});
                }
                else {
                    const err = {};
                    errors.forEach(({ path, message }) => {
                        err[`${path}Error`] = message;
                    });
                    return new Promise((resolve) => {
                        resolve({ ok: false, errors: err })});
                }
            })
    }
}