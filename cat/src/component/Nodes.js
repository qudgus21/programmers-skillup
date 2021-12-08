import { cleanUp } from "../util/cleanUp.js";

export default function Nodes({ $parent, initalState, onClick, onBackClick }) {
  cleanUp(".Nodes");
  const $component = document.createElement("div");
  $component.className = "Nodes";
  $parent.appendChild($component);

  this.onClick = onClick;
  this.onBackClick = onBackClick;

  this.state = {
    ...initalState,
  };

  this.render = () => {
    const { depth, nodes } = this.state;

    $component.innerHTML = `
            ${
              depth.length > 0
                ? `
                <div class="Node Back">
                    <img src="./assets/prev.png">
                </div>`
                : ``
            }

            ${
              nodes.length > 0
                ? `
                    ${nodes
                      .map((node) => {
                        return `
                                <div class="Node" data-nodeId=${node.id}>
                                    <img src="${
                                      node.type === "FILE"
                                        ? "./assets/file.png"
                                        : "./assets/directory.png"
                                    }">
                                    <div>${node.name}</div>
                                </div>
                            `;
                      })
                      .join("")}
                `
                : ``
            }
        `;
  };

  $component.addEventListener("click", (e) => {
    const $div = e.target.closest("div");
    const { nodeid: nodeId } = $div.dataset;

    if ($div.className === "Node" && nodeId) {
      const { nodes } = this.state;

      const target = nodes.find((node) => node.id === nodeId);

      this.onClick(target);
    }

    if ($div.className === "Node Back") {
      this.onBackClick();
    }
  });
}
