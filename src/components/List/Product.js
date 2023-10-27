import { getPrice } from './../../utility/getPrice.js';

export default function Product({ $app, initialState }) {
    this.state = initialState;
    this.$target = document.createElement('li');
    this.$target.className = 'Product';

    this.$target.id = this.state.id;

    $app.appendChild(this.$target);

    this.render = () => {
        const { name, imageUrl, price } = this.state;
        this.$target.innerHTML = `
            <img src=${imageUrl}>
            <div class="Product__info">
              <div>${name}</div>
              <div>${getPrice(price)}원~</div>
            </div>            
        `;
    };

    this.render();
}
