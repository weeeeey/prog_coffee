import { getPrice } from '../../utility/getPrice.js';

export default function SelectedOptions({ $app, initialState, goCartPage }) {
    this.state = {
        ...initialState,
    };
    this.$target = document.createElement('div');
    this.$target.className = 'ProductDetail__selectedOptions';
    this.$target.innerHTML = `<h3>선택된 상품</h3>`;

    $app.appendChild(this.$target);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
        console.log(this.state);
    };

    this.render = () => {
        const { id: proID, productOptions, selectedOptions } = this.state;
        this.$ul = document.createElement('ul');
        this.$target.appendChild(this.$ul);
        this.totalPrice = 0;

        selectedOptions.forEach((opID) => {
            const pro = productOptions.filter((p) => p.id === opID)[0];
            const $li = document.createElement('li');
            $li.id = opID;
            const price = pro.price === 0 ? '' : `${getPrice(pro.price)}원`;
            this.totalPrice += pro.price;
            $li.innerHTML = `
                ${pro.name} ${price}
            `;
            const $input = document.createElement('input');
            $input.className = 'optionInput';
            $input.id = opID;
            $input.type = 'number';
            $li.appendChild($input);
            this.$ul.appendChild($li);
        });
        const totalDiv = document.createElement('div');
        totalDiv.className = 'ProductDetail__totalPrice';
        totalDiv.innerHTML = `${getPrice(this.totalPrice)}원`;

        const goCartBTN = document.createElement('button');
        goCartBTN.className = 'OrderButton';
        goCartBTN.innerHTML = `주문하기`;
        goCartBTN.addEventListener('click', () => {
            goCartPage(proID);
        });

        this.$target.appendChild(totalDiv);
        this.$target.appendChild(goCartBTN);
    };
    this.render();

    // this.$target.addEventListener()
}

// [
//     {
//       productId: '상품 id',
//       optionId: '선택한 옵션의 id',
//       quantity: '선택한 수량'
//     }
// ]
