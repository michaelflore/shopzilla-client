const initState = {
    cart: JSON.parse(localStorage.getItem('cart')) || []
}

const cartReducer = (state = initState, action) => {
    if(action.type == 'ADD_TO_CART') {

        let cart = [];

        const index = state.cart.findIndex(item => item.product._id == action.product._id);

        //If item is already in storage
        if(index > -1) {

            if(localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
            }
            
            cart[index].quantity = action.quantity;

            localStorage.setItem('cart', JSON.stringify(cart))

        } else {

            if(localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
            }

            cart.push({
                product: action.product,
                quantity: action.quantity
            })

            localStorage.setItem('cart', JSON.stringify(cart));
        }

        return {
            ...state,
            cart: cart
        }
    } else if(action.type == 'UPDATE_CART_ITEM') {
        //update state
        let updatedItems = state.cart;
        updatedItems[action.index].quantity = parseInt(action.value);
        
        //update storage
        localStorage.setItem('cart', JSON.stringify(updatedItems));

        return {
            ...state,
            cart: [...updatedItems]
        }
    } else if(action.type == 'REMOVE_FROM_CART') {
        let cart = [];

        if(localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.splice(action.index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));

        return {
            ...state,
            cart: cart
        }

    } else if(action.type == 'EMPTY_CART') {
        localStorage.removeItem('cart');
        let cart = []
        return {
            ...state,
            cart: cart
        }
    } else {
        return state;
    }
}

export default cartReducer;