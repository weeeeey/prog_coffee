const URL =
    'https://h6uc5l8b1g.execute-api.ap-northeast-2.amazonaws.com/dev/products';

export async function getProduct(id = '') {
    try {
        const res = await fetch(`${URL}${id}`);
        if (res.ok) return res.json();
    } catch (error) {
        throw new Error(error);
    }
}
