const localKey = 'products_cart';

export function getCart() {
    const data = window.localStorage.getItem(localKey);
    if (data) {
        return JSON.parse(data);
    } else {
        return;
    }
}

export function setCart(data) {
    const oldData = getCart();
    if (oldData) {
        window.localStorage.setItem(
            localKey,
            JSON.stringify([...oldData, data])
        );
    } else {
        window.localStorage.setItem(localKey, JSON.stringify([data]));
    }
}
// {
//     productId: '상품 id',
//     optionId: '선택한 옵션의 id',
//     quantity: '선택한 수량'
//   }
