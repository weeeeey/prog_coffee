export default function Header($page, title) {
    this.$target = document.createElement('h1');
    this.$target.innerHTML = `${title}`;

    $page.appendChild(this.$target);
}
