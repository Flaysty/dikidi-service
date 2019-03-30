import axios from 'axios';

import { ADD_DIKIDI_STUDIO, REMOVE_DIKIDI_STUDIO, ADD_STUDIO_OPTION, FETCH_STUDIO_OPTIONS, UPDATE_STUDIO_OPTIONS, DELETE_STUDIO_OPTION } from './types'

export function addStudioLine(studio) {
    return {
        type: ADD_DIKIDI_STUDIO,
        studio
    }
}

export function addOptionLine(option) {
    return {
        type: ADD_STUDIO_OPTION,
        option
    }
}

export function removeStudioLine(id) {
    return {
        type: REMOVE_DIKIDI_STUDIO,
        id
    }
}

export function addStudioOptions(options) {
    return {
        type: FETCH_STUDIO_OPTIONS,
        options
    }
}
export function updateStudioOptions(option) {
    return {
        type: UPDATE_STUDIO_OPTIONS,
        option
    }
}

export function removeOptionLine(id) {
    return {
        type: DELETE_STUDIO_OPTION,
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

export function addStudioOption(data) {
    return dispatch => {
        return axios.post('http://localhost:3400/user/studios/options', data)
            .then(({ data: { error, option } }) => {
                if (!error) {
                    dispatch(addOptionLine(option))
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

export function fetchStudioOptions(id) {
    return dispatch => {
        return axios.get(`http://localhost:3400/user/studios/options?id=${id}`)
            .then(({ data: { error, options } }) => {
                if (!error) {
                    dispatch(addStudioOptions(options))
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

export function editStudioOptions(data) {
    return dispatch => {
        return axios.put(`http://localhost:3400/user/studios/options?id=${data.id}`, data)
            .then(({ data: { error, option } }) => {
                if (!error) {
                    dispatch(updateStudioOptions(option))
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

export function deleteStudioOption(id) {
    return dispatch => {
        return axios.delete('http://localhost:3400/user/studios/options', { params: { id } })
            .then(({ data: { error } }) => {
                if (!error) {
                    dispatch(removeOptionLine(id))
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