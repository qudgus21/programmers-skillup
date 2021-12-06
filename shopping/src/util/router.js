const ROUTE_CHANGE = "ROUTE_CHANGE";

export const init = (callback) => {
  window.addEventListener(ROUTE_CHANGE, () => {
    callback();
  });
};

export const routeChange = (url, params) => {
  history.pushState(null, null, url);
  window.dispatchEvent(new CustomEvent(ROUTE_CHANGE, params));
};
