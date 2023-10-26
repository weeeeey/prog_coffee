import { getPriceComma } from './../hook/getPriceComma.js';

export default function Product({ $app, initialState, onClick }) {
    this.state = initialState;
    this.$target = document.createElement('li');
    this.$target.className = 'Product';

    this.render = () => {
        const { id, name, imageUrl, price } = this.state;
        this.$target.id = id;

        this.$target.innerHTML = `
            <img src=${imageUrl}>
            <div class="Product__info">
              <div>${name}</div>
              <div>${getPriceComma(price)}원~</div>
            </div>
        `;
        $app.appendChild(this.$target);
    };
    this.render();
}
