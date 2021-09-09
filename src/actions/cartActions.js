export const addToCart = (product, quantity) => {
    return {
        type: 'ADD_TO_CART',
        product: product,
        quantity: quantity
    }
}

export const updateCartItem = (index, value) => {
    return {
        type: 'UPDATE_CART_ITEM',
        index: index,
        value: value
    }
}

export const removeFromCart = (index) => {
    return {
        type: 'REMOVE_FROM_CART',
        index: index
    }
}

export const emptyCart = () => {
    return {
        type: 'EMPTY_CART'
    }
}