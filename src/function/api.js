import { getPostAction } from './actions';

export const getPosts = (offset) => {
  return async (dispatch) => {
    const response = await fetch(`https://blog.kata.academy/api/articles?offset=${offset}`);
    const data = await response.json();
    dispatch(getPostAction(data));
  };
};
