
import axios from 'axios'
import { API, AUTH_TOKEN } from './keys'
import { getCookie } from './cookie'


export const apiGetRequest = (api) => new Promise(resolve => {
    const token  = getCookie(AUTH_TOKEN)
    const headers = {
        "x-auth-token":token
    }
    axios.get(`${API}/${api}`, {headers}).then(res => {

        const {
            ok,
            result
        } = res.data
        const output = {
            ok,
            result
        }

        resolve(output)
    }).catch(err => {
        resolve({ ok: false })
    })
})


export const apiPostRequest = (api, body) => new Promise(resolve => {
    const token  = getCookie(AUTH_TOKEN)
    const headers = {
        "x-auth-token":token
    }
    axios.post(`${API}/${api}`, body, {headers}).then(res => {

        const {
            ok,
            result
        } = res.data
        const output = {
            ok,
            result
        }

        resolve(output)
    }).catch(err => {
        resolve({ ok: false })
    })
})


export const apiPutRequest = (api, body) => new Promise(resolve => {
    const token  = getCookie(AUTH_TOKEN)
    const headers = {
        "x-auth-token":token
    }
    axios.put(`${API}/${api}`, body, {headers}).then(res => {

        const {
            ok,
            result
        } = res.data
        const output = {
            ok,
            result
        }

        resolve(output)
    }).catch(err => {
        resolve({ ok: false })
    })
})



