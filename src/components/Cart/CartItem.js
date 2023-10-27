import { getPrice } from './../../utility/getPrice.js';

export default function CartItem({ $app, initialState }) {
    this.state = initialState;
    this.$target = document.createElement('li');
    this.$target.className = 'Cart__item';

    $app.appendChild(this.$target);

    this.setState = (nextState) => {
        (this.state = nextState), this.render();
    };

    this.render = () => {
        const { product, option, quantity } = this.state;

        this.$target.innerHTML = `
        <img src=${product.imageUrl}>
        <div class="Cart__itemDesription">
          <div>${product.name} ${option.name} ${getPrice(
            option.price + product.price
        )}원 ${quantity}개</div>
          <div>${getPrice((option.price + product.price) * quantity)}원</div>
        </div>
        `;
    };
    this.render();
}
