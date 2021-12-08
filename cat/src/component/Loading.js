import { cleanUp } from "../util/cleanUp.js";

export default function ({ $parent, isLoading }) {
  cleanUp(".Loading.Modal");
  const $component = document.createElement("div");
  $component.className = "Loading Modal";
  $parent.appendChild($component);

  this.state = {
    isLoading,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { isLoading } = this.state;

    $component.innerHTML = `
            <div class="content">
                <img src="./assets/nyan-cat.gif">
            </div>
        `;

    $component.style.display = isLoading ? "block" : "none";
  };
}
