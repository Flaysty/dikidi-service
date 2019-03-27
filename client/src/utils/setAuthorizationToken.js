import axios from 'axios'

export default function setAuthorizationToken(token, refreshToken) {
    if (token) {
        axios.defaults.headers.common['x-token'] = `${token}`;
        axios.defaults.headers.common['x-refresh-token'] = `${token}`;  
    }
    else {
        delete axios.defaults.headers.common['x-token'];
        delete axios.defaults.headers.common['x-refresh-token'];
    }
}