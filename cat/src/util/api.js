const END_POINT =
  "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";

export const request = async (url, option = {}) => {
  try {
    const fullUrl = `${END_POINT}${url}`;
    const response = await fetch(fullUrl, option);

    if (response.ok) {
      const data = response.json();
      return data;
    } else {
      throw new Error("request fail!");
    }
  } catch (e) {
    alert(e.message);
  }
};
