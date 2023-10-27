import { getProduct } from './utility/api.js';
import { getCart, setCart } from './utility/localStorage.js';

import ProductListPage from './page/ProductListPage.js';
import ProductDetail from './page/ProductDetail.js';
import CartPage from './page/CartPage.js';

export default function App($app) {
    this.state = {
        url: '/web',
        products: [],
        seeingProduct: {},
        cart: [],
        willCart: [],
    };

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.init = async () => {
        try {
            await getProduct().then((res) => {
                this.setState({
                    ...this.state,
                    products: res,
                });
            });
        } catch (error) {
            throw new Error(error);
        }
    };
    this.init();

    this.render = () => {
        window.history.pushState('', '', this.state.url);
        const urlArray = this.state.url.split('/');
        $app.innerHTML = ``;

        if (urlArray.includes('products')) {
            new ProductDetail({
                $app,
                initialState: this.state.seeingProduct,
                goCartPage: (productId) => {
                    const $optionInputs =
                        document.querySelectorAll('.optionInput');
                    $optionInputs.forEach((node) => {
                        const optionId = parseInt(node.id);
                        const quantity = parseInt(node.value);
                        setCart({
                            productId,
                            optionId,
                            quantity,
                        });
                    });
                    const cartData = getCart();
                    if (!cartData && this.state.willCart.length === 0) {
                        window.alert('장바구니가 비어있습니다.');
                        return;
                    }
                    this.setState({
                        ...this.state,
                        url: '/web/cart',
                        cart: cartData,
                        willCart: [],
                    });
                },
            });
        } else if (urlArray.includes('cart')) {
            new CartPage({
                $app,
                initialState: {
                    products: this.state.products,
                    cart: this.state.cart,
                },
                reset: () => {
                    this.setState({
                        url: '/web',
                        products: [],
                        seeingProduct: {},
                        cart: [],
                    });
                    window.localStorage.removeItem('products_cart');
                },
            });
        } else {
            new ProductListPage({
                $app,
                initialState: this.state.products,
                onClick: async (id) => {
                    try {
                        await getProduct(`/${id}`).then((res) => {
                            this.setState({
                                ...this.state,
                                url: `/web/products/${id}`,
                                seeingProduct: res,
                            });
                        });
                    } catch (error) {
                        throw new Error(error);
                    }
                },
            });
        }
    };
}
