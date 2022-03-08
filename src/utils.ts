import axios from 'axios'
import url from './config'

export const authenticatedFetch = (method: any, path: any, data = {}) => {
    return axios({
        method: method,

        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        url: url + path,
        data: data
    })
}


export const getUserId = async () => {
    let id = parseInt(localStorage.token.substr(0, localStorage.token.indexOf('|')))

    return await authenticatedFetch('GET', `/token/${id}`)
        .then((res) => {
            authenticatedFetch('GET', `/api/user-id/${res.data}`).then((res) => {
                return res
            })
        })

}
