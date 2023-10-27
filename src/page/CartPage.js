import CartItem from '../components/Cart/CartItem.js';
import Header from '../components/Header.js';
import { getPrice } from '../utility/getPrice.js';

export default function CartPage({ $app, initialState, reset }) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.className = 'CartPage';

    new Header(this.$target, '장바구니');

    $app.appendChild(this.$target);

    this.render = () => {
        this.$cart = document.createElement('div');
        this.$cart.className = 'Cart';
        this.$target.appendChild(this.$cart);

        this.$ul = document.createElement('ul');
        this.$target.appendChild(this.$ul);

        this.totalPrice = 0;

        this.state.cart.forEach((node) => {
            const pro = this.state.products.filter(
                (pro) => pro.id === node.node.productId
            )[0];
            const op = pro.productOptions.filter(
                (op) => op.id === node.optionId
            )[0];
            new CartItem({
                $app: this.$ul,
                initialState: {
                    product: pro,
                    option: op,
                    quantity: node.quantity,
                },
            });
            this.totalPrice += (pro.price + op.price) * node.quantity;
        });

        this.$totalPrice = document.createElement('div');
        this.$totalPrice.className = 'Cart__totalPrice';
        this.$totalPrice.innerHTML = `총 상품가격 ${getPrice(
            this.totalPrice
        )}원`;
        this.$cart.appendChild(this.$totalPrice);

        this.$orderBTN = document.createElement('button');
        this.$orderBTN.className = 'OrderButton';
        this.$orderBTN.innerHTML = `주문하기`;
        this.$orderBTN.onclick = (e) => {
            reset();
        };
        this.$cart.appendChild(this.$orderBTN);
    };
    this.render();
}
