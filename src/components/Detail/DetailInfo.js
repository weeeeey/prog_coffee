import { getPrice } from './../../utility/getPrice.js';
import SelectedOptions from './SelectedOptions.js';

export default function DetaulInfo({ $app, initialState, goCartPage }) {
    this.goCartPage = goCartPage;
    this.state = {
        ...initialState,
        selectedOptions: [],
        clickedOp: 0,
        willCart: [],
    };
    this.$target = document.createElement('div');
    this.$target.className = 'ProductDetail__info';

    $app.appendChild(this.$target);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        this.$target.innerHTML = `
            <h2>${this.state.name}</h2>
            <div class="ProductDetail__price">${getPrice(
                this.state.price
            )}원~</div>
        `;
        this.$select = document.createElement('select');
        this.$select.innerHTML = `
            <option value=0>선택하세요.</option>
        `;
        this.$target.appendChild(this.$select);
        this.state.productOptions.forEach((op) => {
            const $option = document.createElement('option');
            this.$select.appendChild($option);
            $option.value = op.id;
            $option.selected = op.id === this.state.clickedOp ? true : false;
            let isZero = '';
            if (op.stock === 0) {
                isZero = '(품절)';
                $option.disabled = true;
            }
            const opPrice = op.price === 0 ? '' : `(+${getPrice(op.price)}원)`;
            $option.innerHTML = `
                ${isZero} ${this.state.name} ${opPrice}
            `;
        });

        this.$select.addEventListener('change', (e) => {
            const value = parseInt(e.target.value);
            if (value === 0 || this.state.selectedOptions.includes(value))
                return;
            this.setState({
                ...this.state,
                selectedOptions: [...this.state.selectedOptions, value],
                clickedOp: value,
            });
        });

        this.$selectedOptions = new SelectedOptions({
            $app: this.$target,
            initialState: this.state,
            goCartPage: this.goCartPage,
        });
    };
    this.render();
}
