import { request } from "../util/api.js";
import ProductDetail from "../component/ProductDetail.js";

export default function ProductDetailPage({ $parent, productId }) {
  const $page = document.createElement("div");
  $page.className = "ProductDetailPage";
  $page.innerHTML = `<h1>상품 정보</h1>`;

  this.state = {
    productId,
    product: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (!this.state.product) {
      $parent.innerHTML = `Loading...`;
    } else {
      $parent.innerHTML = ``;
      $parent.appendChild($page);

      new ProductDetail({
        $parent: $page,
        product: this.state.product,
        selectedOptions: [],
      }).render();
    }
  };

  this.fetchProduct = async () => {
    const { productId } = this.state;
    const product = await request(`/dev/products/${productId}`);

    this.setState({
      ...this.state,
      product,
    });
  };

  this.fetchProduct();
}
