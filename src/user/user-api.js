// let url = 'https://62zn1cn8nk.execute-api.us-east-2.amazonaws.com/prod';
// import { url } from '../config';

const getUser = async (params, signal) => {
    try {
        let response = await fetch('/api/users/' + params.userId, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            signal: signal
        })

        return await response.json()
    } catch(e) {
        console.log(e)
    }
}

const removeUser = async (params, credentials) => {
    try {
        let response = await fetch('/api/users/' + params.userId, {
            method: "DELETE", 
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t 
            }
        })

        return await response.json()
    } catch(e) {
        console.log(e)
    }
}

const getAllUsers = async (signal) => {
    try {
        let response = await fetch('/api/users', {
            method: "GET",
            signal: signal
        })

        return await response.json()
    } catch(e) {
        console.log(e)
    }
}

const getUsersProducts = async(params, signal) => {
    try {
        let response = await fetch('/api/products/by/' + params.userId, {
            method: "GET",
            signal: signal
        })

        return await response.json()
    } catch(e) {
        console.log(e)
    }
}

export { getUser, getAllUsers, getUsersProducts, removeUser };