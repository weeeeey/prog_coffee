import Header from './component/Header.js';
import ProductDetailInfo from './component/detail/ProductDetailInfo.js';

export default function ProductDetailPage({ $app, initialState }) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.className = 'ProductDetailPage';

    new Header(this.$target, `${this.state.name} 상품 정보`);

    $app.appendChild(this.$target);

    this.setState = (nextState) => {
        (this.state = nextState), this.render();
    };
    this.render = () => {
        this.$div = document.createElement('div');
        this.$div.className = 'ProductDetail';
        this.$div.innerHTML = `
            <img src=${this.state.imageUrl}>
        `;
        new ProductDetailInfo({
            $app: this.$div,
            initialState: this.state,
        });

        this.$target.appendChild(this.$div);

        this.$selectedOptions = document.createElement('div');
        this.$selectedOptions.className = 'ProductDetail__selectedOptions';
    };
    this.render();
}
