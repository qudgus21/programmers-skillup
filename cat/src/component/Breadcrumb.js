import { cleanUp } from "../util/cleanUp.js";

export default function Breadcrumb({ $parent, initalState, onClick }) {
  cleanUp(".Breadcrumb");
  const $component = document.createElement("nav");
  $component.className = "Breadcrumb";
  $parent.appendChild($component);

  this.onClick = onClick;

  this.state = {
    depth: initalState.depth,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { depth } = this.state;

    $component.innerHTML = `
      <div class="nav-item">root</div>
      ${depth
        .map(
          (node, index) => `
        <div class="nav-item" data-index="${index}">${node.name}</div>
      `
        )
        .join("")}
    `;
  };

  $component.addEventListener("click", (e) => {
    const $navItem = e.target.closest(".nav-item");

    if ($navItem) {
      const { index } = $navItem.dataset;

      if (index) {
        this.onClick(parseInt(index));
      } else {
        this.onClick(-1);
      }
    }
  });
}
