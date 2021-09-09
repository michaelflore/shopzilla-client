// let url = 'https://62zn1cn8nk.execute-api.us-east-2.amazonaws.com/prod';
// import { url } from '../config';

const signup = async (user) => {
    try {
        console.log(user)

        let response = await fetch("/signup", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        console.log(response)
        return await response.json()
    } catch(e) {
        console.log(e)
    }
}

const login = async (user) => {
    try {
        console.log(user)
        let response = await fetch("/signin", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
console.log(response)
        return await response.json()
    } catch(e) {
        console.log(e)
    }
}

const logout = async () => {
    try {
        let response = await fetch("/signout", {
            method: "GET"
        })

        return await response.json()
    } catch(e) {
        console.log(e)
    }
}

export { signup, login, logout };