export function getCart() {
    const data = window.localStorage.getItem('products_cart');
    if (data) {
        return JSON.stringify(data);
    } else {
        return;
    }
}

export function setCart(data) {
    const oldData = getCart();
    window.localStorage.setItem('products_cart', [...oldData, data]);
}
