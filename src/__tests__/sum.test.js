import { removeFromCart } from "../actions/cartActions";

function sum(a, b) {
    return a + b;
}

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

test('objects to be equal', () => {
    expect({ id: 1 }).toEqual({ id: 1 });
})

test('removeFromCart', () => {
    let index = 0;
    expect(removeFromCart(index)).toEqual({
        type: 'REMOVE_FROM_CART',
        index: index
    })
})