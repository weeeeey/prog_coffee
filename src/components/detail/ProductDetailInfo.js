import { getPriceComma } from './../../hook/getPriceComma.js';

export default function ProductDetail({ $app, initialState }) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.className = 'ProductDetail__info';

    $app.appendChild(this.$target);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        const { id, name, price, productOptions } = this.state;

        this.$target.innerHTML = `
        <h2>${name}</h2>
        <div class="ProductDetail__price">${getPriceComma(
            price
        )}원~</div>            
        `;
        this.$select = document.createElement('select');
        this.$select.innerHTML = `
        <option>선택하세요.</option>
        `;
        this.$target.appendChild(this.$select);

        productOptions.forEach((op) => {
            const option = document.createElement('option');
            const isZero = op.stock === 0 ? '(품절)' : '';
            const opPrice =
                op.price === 0 ? '' : `(+${getPriceComma(op.price)}원)`;
            option.disabled = op.stock === 0 ? true : false;

            option.innerHTML = `${isZero} ${name} ${op.name} ${opPrice}`;
            option.value = op.id;

            this.$select.appendChild(option);
        });
    };
    this.render();
}

// "id": 1,
//   "name": "커피 컵",
//   "price": 10000,
//   "imageUrl": "https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png",
//   "productOptions": [
//     {
//       "id": 1,
//       "name": "100개 묶음",
//       "price": 0,
//       "stock": 5,
//       "created_at": "2021-08-23T22:52:17.634Z",
//       "updated_at": "2021-08-23T22:52:17.638Z"
//     },
//     {
//       "id": 2,
//       "name": "200개 묶음",
//       "price": 8000,
//       "stock": 5,
//       "created_at": "2021-08-23T22:52:34.248Z",
//       "updated_at": "2021-08-23T22:52:34.252Z"
//     },
//     {
//       "id": 24,
//       "name": "10개 묶음",
//       "price": 0,
//       "stock": 555,
//       "created_at": "2021-08-23T23:03:04.873Z",
//       "updated_at": "2021-08-23T23:03:04.879Z"
//     }
//   ]
