const IMAGE_PATH_PREFIX =
  "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";

export default function ImageViewer({ $parent, selectedFilePath }) {
  const $component = document.createElement("div");
  $component.className = "Modal ImageView";
  $parent.appendChild($component);

  this.state = {
    selectedFilePath,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { selectedFilePath } = this.state;

    $component.innerHTML = `
            <div class="content">
                ${
                  selectedFilePath
                    ? `<img class="catImage" src="${IMAGE_PATH_PREFIX}${selectedFilePath}">`
                    : ``
                }
            </div>
        `;
  };
}
