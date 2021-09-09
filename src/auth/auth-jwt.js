import { logout } from "./api-auth";

const auth = {
    authenticate(data, cb) {
        if(typeof window !== undefined) {
            sessionStorage.setItem('jwt', JSON.stringify(data))
            cb()
        }
    },

    isAuthenticated() {

        if(typeof window == "undefined") {
            return false
        }

        if(sessionStorage.getItem('jwt')) {
            return JSON.parse(sessionStorage.getItem('jwt'))
        } else {
            return false;
        }

    },

    removeJWT(cb) {
        if(typeof window !== "undefined") {
            sessionStorage.removeItem('jwt')
        }

        cb()

        logout().then(() => {
            document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        })
    }
}

export default auth;