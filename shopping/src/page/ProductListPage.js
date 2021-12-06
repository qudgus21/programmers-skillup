import ProductList from "../component/ProductList.js";
import { request } from "../util/api.js";

export default function ProductListPage({ $parent }) {
  const $page = document.createElement("div");
  $page.className = "ProductListPage";
  $page.innerHTML = `<h1>상품목록</h1>`;

  this.state = {};

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    //자신을 렌더링
    $parent.appendChild($page);

    //하위 컴포넌트 렌더링
    const productList = new ProductList({
      $parent: $page,
      productList: this.state,
    }).render();
  };

  this.fetchProducts = async () => {
    const products = await request("/dev/products");
    this.setState(products);
  };

  this.fetchProducts();
}
