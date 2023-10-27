import Header from '../components/Header.js';
import Product from './../components/List/Product.js';

export default function ProductListPage({ $app, initialState, onClick }) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.className = 'ProductListPage';

    new Header(this.$target, '상품목록');

    $app.appendChild(this.$target);

    this.render = () => {
        this.$ul = document.createElement('ul');
        this.state.forEach((node) => {
            this.$product = new Product({
                $app: this.$ul,
                initialState: node,
            });
        });
        this.$target.appendChild(this.$ul);
    };
    this.render();

    this.$target.addEventListener('click', (e) => {
        const product = e.target.closest('.Product');
        if (!product) return;

        onClick(parseInt(product.id));
    });
}
