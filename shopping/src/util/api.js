const END_POINT = "https://uikt6pohhh.execute-api.ap-northeast-2.amazonaws.com";

export const request = async (url, options = {}) => {
  try {
    const fullUrl = `${END_POINT}${url}`;
    const response = await fetch(fullUrl, options);
    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      throw new Error("request fail!");
    }
  } catch (e) {
    alert(e.message);
  }
};
