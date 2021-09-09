import queryString from 'querystring';

// let url = 'https://62zn1cn8nk.execute-api.us-east-2.amazonaws.com/prod';
// import { url } from '../config';


//Read an individual product for the update, and individual view
const read = async (params, signal) => {
    try {
        let response = await fetch('/api/products/' + params.productId, {
            method: 'GET',
            signal: signal
        })
        return response.json()
    } catch(err) {
        console.log(err)
    }
}

const createProduct = async (params, credentials, data) => {
    try {
        let response = await fetch('/api/products/by/' + params.userId, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: data
        })
        
        return await response.json()
    } catch(e) {
        console.log(e)
    }
}

const removeProduct = async (params, credentials) => {
    try {
        let response = await fetch('/api/products/by/' + params.userId + '/' + params.productId, {
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

const listCategories = async(signal) => {
    try {
        let response = await fetch('/api/products/categories', {
            method: "GET",
            signal: signal
        })

        return await response.json()
    } catch(e) {
        console.log(e)
    }
}

const listAllProductsQuery = async(params, signal) => {
    const query = queryString.stringify(params)
console.log(query)
    try {
        let response = await fetch('/api/products?' + query, {
            method: "GET",
            signal: signal
        }) 

        return response.json()
    } catch(e) {
        console.log(e)
    }
}

//List the 20 latest products
const latestProducts = async (params, signal) => {
    const query = queryString.stringify(params)
console.log(query)
    try {
        let response = await fetch('/api/latest?' + query, {
            method: "GET",
            signal: signal
        })

        return response.json()
    } catch (e) {
        console.log(e)
    }
}

// const listAllProducts = async(signal) => {
//     try {
//         let response = await fetch(url + '/api/products', {
//             method: "GET",
//             signal: signal
//         })

//         return response.json()
//     } catch(e) {
//         console.log(e)
//     }
// }

export { read, createProduct, removeProduct, latestProducts, listCategories, listAllProductsQuery};