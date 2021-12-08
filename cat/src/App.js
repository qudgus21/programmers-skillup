import Breadcrumb from "./component/Breadcrumb.js";
import ImageViewer from "./component/ImageViewer.js";
import Loading from "./component/Loading.js";
import Nodes from "./component/Nodes.js";
import { request } from "./util/api.js";
import { cleanUp } from "./util/cleanUp.js";

const cache = {};

export default function App({ $parent }) {
  this.state = {
    nodes: [],
    depth: [],
    isLoading: false,
    selectedFilePath: "",
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { nodes, depth, selectedFilePath, isLoading } = this.state;

    new Breadcrumb({
      $parent,
      initalState: {
        depth,
      },
      onClick: async (index) => {
        if (index === depth.length - 1) return;

        if (index >= 0) {
          const nextDepth = depth.slice(0, index + 1);

          this.setState({
            ...this.state,
            depth: nextDepth,
            nodes: cache[nextDepth[nextDepth.length - 1].id],
          });
        } else {
          //root 클릭
          this.setState({
            ...this.state,
            depth: [],
            nodes: cache.rootNodes,
          });
        }
      },
    }).render();

    new Nodes({
      $parent,
      initalState: {
        depth,
        nodes,
      },

      onClick: async (node) => {
        try {
          if (node.type === "DIRECTORY") {
            if (cache[node.id]) {
              this.setState({
                ...this.state,
                depth: [...this.state.depth, node],
                nodes: cache[node.id],
              });
            } else {
              this.setState({
                ...this.state,
                isLoading: true,
              });

              const nextNodes = await request(`/${node.id}`);

              this.setState({
                ...this.state,
                depth: [...this.state.depth, node],
                nodes: nextNodes,
                isLoading: false,
              });

              cache[node.id] = nextNodes;
            }
          } else if (node.type === "FILE") {
            this.setState({
              ...this.state,
              selectedFilePath: node.filePath,
            });
          }
        } catch (e) {
          alert(e.message);
        }
      },

      onBackClick: async () => {
        try {
          const nextState = { ...this.state };

          nextState.depth.pop();

          const prevNodeId =
            nextState.depth.length === 0
              ? null
              : nextState.depth[nextState.depth.length - 1].id;

          //캐싱되어있는 데이터 사용
          if (prevNodeId === null) {
            this.setState({
              ...nextState,
              nodes: cache.rootNodes,
              isLoading: false,
            });
          } else {
            this.setState({
              ...nextState,
              nodes: cache[prevNodeId],
              isLoading: false,
            });
          }
        } catch (e) {
          alert(e.message);
        }
      },
    }).render();

    if (selectedFilePath) {
      new ImageViewer({
        $parent,
        selectedFilePath,
      }).render();
    }

    new Loading({
      $parent,
      isLoading,
    }).render();
  };

  this.init = async () => {
    try {
      this.setState({
        ...this.state,
        isLoading: true,
      });

      const rootNodes = await request("");
      cache.rootNodes = rootNodes;

      this.setState({
        ...this.state,
        nodes: rootNodes,
        isLoading: false,
      });

      //esc => 모달제거
      window.addEventListener("keydown", (e) => {
        if (e.keyCode === 27) {
          cleanUp(".Modal.ImageView");
          this.setState({
            ...this.state,
            selectedFilePath: "",
          });
        }
      });

      //이미지 외부 클릭 => 모달제거
      window.addEventListener("click", (e) => {
        const $catImage = e.target.closest(".catImage");
        if (!$catImage && e.target.className === "Modal ImageView") {
          cleanUp(".Modal.ImageView");
          this.setState({
            ...this.state,
            selectedFilePath: "",
          });
        }
      });
    } catch (e) {
      alert(e.message);
    }
  };

  this.init();
}
