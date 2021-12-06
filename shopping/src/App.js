import ProductListPage from "./page/ProductListPage.js";
import ProductDetailPage from "./page/ProductDetailPage.js";
import CartPage from "./page/CartPage.js";
import { init } from "./util/router.js";

export default function App({ $parent }) {
  this.route = () => {
    const path = location.pathname.split("/");
    const target = path[path.length - 1];

    $parent.innerHTML = ``;

    if (target === "") {
      new ProductListPage({ $parent }).render();
    } else if (target.includes("products")) {
      const [, productId] = target.split("-");

      new ProductDetailPage({
        $parent,
        productId,
      }).render();
    } else if (target === "cart") {
      new CartPage({ $parent }).render();
    }
  };

  window.addEventListener("popstate", this.route);
  init(this.route);
  this.route();
}
