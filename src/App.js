import { getProduct } from './api.js';
import { getCart, setCart } from './localStorage.js';
import CartPage from './CartPage.js';
import ProductDetailPage from './ProductDetailPage.js';
import ProductListPage from './ProductListPage.js';

export default function App($app) {
    this.state = {
        url: '/web',
        products: [],
        detailProduct: {},
        selectedProduct: [],
        cart: [],
    };
    const productList = new ProductListPage({
        $app,
        initialstate: this.state.products,
        onClick: async (id) => {
            try {
                await getProduct(`/${id}`).then((res) => {
                    this.setState({
                        ...this.state,
                        url: `/web/products/${id}`,
                        detailProduct: res,
                    });
                });
            } catch (error) {
                throw new Error(error);
            }
        },
    });

    this.setState = (nextState) => {
        this.state = nextState;
        productList.setState(this.state.products);
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

        if (urlArray.includes('products')) {
            $app.innerHTML = ``;
            new ProductDetailPage({
                $app,
                initialState: this.state.detailProduct,
                onClick: (data) => {
                    this.setState({
                        ...this.state,
                        selectedProduct: [...this.state.selectedProduct, data],
                    });
                },
                addCart: (data) => {
                    setCart(data);
                },
            });
        }
        if (urlArray.includes('cart')) {
            if (this.state.cart.length === 0) {
                window.alert('장바구니가 비어있습니다.');
            } else {
                $app.innerHTML = ``;
                new CartPage({
                    $app,
                    initialState: this.state.cart,
                });
            }
        }
    };
}
