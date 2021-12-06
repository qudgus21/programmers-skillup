import { isEmptyObj } from "../util/helper.js";
import { routeChange } from "../util/router.js";

export default function ProductList({ $parent, productList }) {
  const $productList = document.createElement("ul");
  $productList.className = "ProductList";
  $parent.appendChild($productList);

  this.state = productList;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  $productList.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    const { productId } = $li.dataset;

    if (productId) {
      routeChange(`/web/products-${productId}`);
    }
  });

  this.render = () => {
    if (isEmptyObj(productList)) {
      return;
    }

    $productList.innerHTML = `
        ${this.state
          .map(
            (product) =>
              `
                <li class="Product" data-product-id=${product.id}>
                    <img src="${product.imageUrl}">
                    <div class="Product__info">
                    <div>${product.name}</div>
                    <div>${product.price.toLocaleString()}원~</div>
                    </div>
                </li>
                `
          )
          .join("")}
        `;
  };
}
