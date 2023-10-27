import Header from './../components/Header.js';
import DetailInfo from '../components/Detail/DetailInfo.js';

export default function ProductDetail({ $app, initialState, goCartPage }) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.className = 'ProductDetailPage';
    this.goCartPage = goCartPage;
    new Header(this.$target, `${this.state.name} 상품 정보`);

    $app.appendChild(this.$target);

    this.render = () => {
        this.$detail = document.createElement('div');
        this.$detail.className = 'ProductDetail';
        this.$target.appendChild(this.$detail);

        this.$detail.innerHTML = `<img src=${this.state.imageUrl}>`;

        this.$info = new DetailInfo({
            $app: this.$detail,
            initialState: this.state,
            goCartPage: this.goCartPage,
        });
    };

    this.render();
}
