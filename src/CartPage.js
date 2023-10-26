import Header from './component/Header.js';
import { getPriceComma } from './hook/getPriceComma.js';

export default function CartPage({ $app, initialState }) {
    this.state = initialState;

    this.$target = document.createElement('div');
    this.$target.className = 'CartPage';

    new Header(this.$target, '장바구니');
    $app.appendChild(this.$target);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        this.$cart = document.createElement('div');
        this.$cart.className = 'Cart';

        this.$target.appendChild(this.$cart);

        this.ul = document.createElement('ul');
        this.$cart.appendChild(this.ul);
        let total = 0;

        this.state.forEach((node) => {
            total = total + node.price * node.optionValue;
            const li = document.createElement('li');
            li.className = 'Cart__item';
            li.innerHTML = `
            <img src=${node.imageUrl}>
            <div class="Cart__itemDesription">
              <div>${node.name} ${node.optionName} ${getPriceComma(
                node.price
            )}원 ${node.optionValue}개</div>
              <div>${getPriceComma(node.price * node.optionValue)}원</div>
            </div>
            `;
        });

        this.$totalPrice = document.createElement('div');
        this.$totalPrice.className = 'Cart__totalPrice';
        this.$totalPrice.innerHTML = `총 상품가격 ${total}`;

        this.$orderBTN = document.createElement('button');
        this.$orderBTN.className = 'OrderButton';
        this.$orderBTN.innerHTML = `주문하기`;

        this.$cart.appendChild(this.$totalPrice);
        this.$cart.appendChild(this.$orderBTN);

        this.$orderBTN.addEventListener('click', () => {
            window.localStorage.removeItem('products_cart');
            window.alert('주문 성공!');
        });
    };
    this.render();
}
