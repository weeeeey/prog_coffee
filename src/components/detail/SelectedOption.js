export default function SelectedOptions({ $app, initialState }) {
    this.state = initialState;
    $app.innerHTML = `<h3>선택된 상품</h3>`;
    this.$target = document.createElement('ul');
    $app.appendChild(this.$target);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        this.state.forEach((node) => {
            const li = document.createElement('li');
            // li.innerHTML=`${node.name} ${node.}`
        });
    };
    this.render();
}
