import { routeChange } from "../util/router.js";
import { getItem, setItem } from "../util/storage.js";

export default function SelectedOptions({ $parent, product, selectedOptions }) {
  const $selectedOption = document.createElement("div");
  $selectedOption.className = "ProductDetail__selectedOptions";
  $parent.appendChild($selectedOption);

  this.state = {
    product,
    selectedOptions,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.getTotalPrice = () => {
    const { product, selectedOptions } = this.state;
    const { price: productPrice } = product;

    return selectedOptions
      .reduce(
        (acc, cur) => acc + (productPrice + cur.optionPrice) * cur.quantity,
        0
      )
      .toLocaleString();
  };

  $selectedOption.addEventListener("change", (e) => {
    if (e.target.tagName === "INPUT") {
      const nextQuantity = parseInt(e.target.value);
      const nextSelectedOptions = [...this.state.selectedOptions];

      if (typeof nextQuantity === "number") {
        const { product } = this.state;

        const optionId = parseInt(e.target.dataset.optionid);
        const option = product.productOptions.find(
          (option) => option.id === optionId
        );
        const selectedOptionIndex = nextSelectedOptions.findIndex(
          (selectedOption) => selectedOption.optionId === optionId
        );
        nextSelectedOptions[selectedOptionIndex].quantity =
          option.stock >= nextQuantity ? nextQuantity : option.stock;
      }

      this.setState({
        ...this.state,
        selectedOptions: nextSelectedOptions,
      });
    }
  });

  $selectedOption.addEventListener("click", (e) => {
    const { selectedOptions } = this.state;

    if (e.target.className === "OrderButton") {
      const cartData = getItem("products_cart", []);

      setItem(
        "products_cart",
        cartData.concat(
          selectedOptions.map((selectedOption) => ({
            productId: selectedOption.productId,
            optionId: selectedOption.optionId,
            quantity: selectedOption.quantity,
          }))
        )
      );
      routeChange("/web/cart");
    }
  });

  this.render = () => {
    const { selectedOptions } = this.state;

    $selectedOption.innerHTML = `
            <h3>선택된 상품</h3>
            <ul>
                ${selectedOptions
                  .map(
                    (selectedOption) => `
                    <li>
                    ${selectedOption.optionName} ${
                      product.price + selectedOption.optionPrice
                    }원
                    <input type="text" data-optionId="${
                      selectedOption.optionId
                    }" value="${selectedOption.quantity}">
                    </li>
                 `
                  )
                  .join("")}
            </ul>
            <div class="ProductDetail__totalPrice">${this.getTotalPrice()}원</div>
            <button class="OrderButton">주문하기</button>
        `;
  };
}
