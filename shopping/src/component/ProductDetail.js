import { routeChange } from "../util/router.js";
import SelectedOptions from "./SelectedOptions.js";

export default function ProductDetail({ $parent, product, selectedOptions }) {
  const $productDetail = document.createElement("div");
  $productDetail.className = "ProductDetail";
  $parent.appendChild($productDetail);

  this.state = {
    product,
    selectedOptions,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  $productDetail.addEventListener("change", (e) => {
    const { product, selectedOptions } = this.state;

    if (e.target.tagName === "SELECT") {
      const selectedOptionId = parseInt(e.target.value);
      const option = product.productOptions.find(
        (option) => option.id === selectedOptionId
      );
      const selectedOption = selectedOptions.find(
        (selectedOption) => selectedOption.optionId === selectedOptionId
      );

      if (option && !selectedOption) {
        const nextSelectedOptions = [
          ...selectedOptions,
          {
            productId: product.id,
            optionId: option.id,
            quantity: 1,
            optionName: option.name,
            optionPrice: option.price,
          },
        ];

        this.setState({
          ...this.state,
          selectedOptions: nextSelectedOptions,
        });
      }
    }
  });

  this.render = () => {
    const { product, selectedOptions } = this.state;

    $productDetail.innerHTML = `
        <img src="${product.imageUrl}">
        <div class="ProductDetail__info">
        <h2>${product.name}</h2>
        <div class="ProductDetail__price">${product.price.toLocaleString()}원~</div>
            <select>
                <option>선택하세요.</option>
                ${product.productOptions
                  .map(
                    (option) =>
                      `
                    <option value="${option.id}" ${
                        option.stock === 0 ? "disabled" : ""
                      }>
                        ${option.stock === 0 ? "(품절) " : ""}${product.name} ${
                        option.name
                      } ${
                        option.price > 0
                          ? `(+${option.price.toLocaleString()}원)`
                          : ""
                      }
                    </option>
                    `
                  )
                  .join("")}
            </select>
        </div>
    `;

    new SelectedOptions({
      $parent: document.querySelector(".ProductDetail__info"),
      product,
      selectedOptions,
    }).render();
  };
}
