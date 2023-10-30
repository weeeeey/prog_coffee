import { getProduct } from './utility/api.js';
import { getCart, setCart } from './utility/localStorage.js';

import ProductListPage from './page/ProductListPage.js';
import ProductDetail from './page/ProductDetail.js';
import CartPage from './page/CartPage.js';
import { init } from './router.js';

export default async function App($app) {
    this.route = () => {
        const { pathname } = window.location;
        $app.innerHTML = ``;

        if (pathname === '/') {
            new ProductListPage({
                $app,
            }).render();
        } else if (pathname.indexOf('/products/') === 0) {
            const [, , productId] = pathname.split('/');
            new ProductDetail({
                $app,
                productId,
            }).render();
        } else if (pathname === '/cart') {
            new CartPage({
                $app,
            }).render();
        }
    };

    init(this.route);

    this.route();

    window.addEventListener('popstate', this.route);
}
