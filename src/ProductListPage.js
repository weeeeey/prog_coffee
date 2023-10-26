import Header from './component/Header.js';
import Product from './component/Product.js';

export default function ProductListPage({ $app, initialstate, onClick }) {
    this.state = initialstate;
    this.$target = document.createElement('div');
    this.$target.className = 'ProductListPage';

    new Header(this.$target, '상품목록');

    $app.appendChild(this.$target);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };
    this.render = () => {
        this.$ul = document.createElement('ul');
        this.$target.appendChild(this.$ul);

        this.state.forEach((node) => {
            new Product({
                $app: this.$ul,
                initialState: node,
            });
        });
    };

    this.$target.addEventListener('click', async (e) => {
        const product = e.target.closest('.Product');
        if (!product) return;
        await onClick(parseInt(product.id));
    });
}
