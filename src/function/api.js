import { getPostAction, loading, getArticleAction } from './actions';

export const getPosts = (offset) => {
  return async (dispatch) => {
    dispatch(loading());
    const response = await fetch(`https://blog.kata.academy/api/articles?offset=${offset}`);
    const data = await response.json();
    const page = offset / 20;
    dispatch(getPostAction(data, page));
  };
};

export const getArticle = (slug) => {
  return async (dispatch) => {
    dispatch(loading());
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`);
    const data = await response.json();
    dispatch(getArticleAction(data.article));
  };
};
