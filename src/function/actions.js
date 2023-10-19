export const getPostAction = (value, page) => {
  return { type: 'GET_POSTS', value: value, page };
};

export const loading = () => {
  return { type: 'LOADING' };
};

export const getArticleAction = (value) => {
  return { type: 'GET_ARTICLE', value: value };
};

export const authentication = (value) => {
  return { type: 'AUTH', value: value };
};

export const logOut = () => {
  return { type: 'LOG_OUT' };
};

export const clearArticle = () => {
  return { type: 'CLEAR' };
};
