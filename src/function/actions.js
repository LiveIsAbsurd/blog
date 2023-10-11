export const getPostAction = (value, page) => {
  return { type: 'GET_POSTS', value: value, page };
};

export const loading = () => {
  return { type: 'LOADING' };
};

export const getArticleAction = (value) => {
  return { type: 'GET_ARTICLE', value: value };
};
