import axios from 'axios'

export const authenticatedFetch = (method: any, path: any, data = {}) => {
    return axios({
        method: method,

        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        url: path,
        data: data
    })
}
