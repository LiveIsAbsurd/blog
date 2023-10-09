export const getPostAction = (value) => {
  return { type: 'GET_POSTS', value: value };
};

export const newPage = () => {
  return { type: 'NEW_PAGE' };
};
