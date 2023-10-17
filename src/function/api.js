import { getPostAction, loading, getArticleAction, authentication } from './actions';

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

export const createAccount = (data) => {
  return (dispatch) => {
    fetch('https://blog.kata.academy/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        } else {
          let error = await response.json();
          throw new Error(error);
        }
      })
      .then((data) => {
        dispatch(authentication(data.user));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
