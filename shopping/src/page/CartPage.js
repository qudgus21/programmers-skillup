export default function CartPage({ $parent }) {
  const $page = document.createElement("div");
  $page.className = "CartPage";
  $page.innerHTML = `<h1>장바구니</h1>`;

  this.render = () => {
    $parent.appendChild($page);
  };
}
