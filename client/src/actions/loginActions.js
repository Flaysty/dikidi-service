import axios from 'axios';

export function userLoginRequest(userData) {
    return dispatch => {
        return axios.post('http://localhost:3400/user/login', userData);
    }
}