import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createRoot } from 'react-dom/client';

import App from './components/app/';

const inState = {
  posts: [],
  pageCount: 0,
  page: 1,
  loading: true,
  error: false,
  article: null,
  token: null,
  username: null,
  email: null,
  image: null,
};

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const reducer = (state = inState, action) => {
  switch (action.type) {
    case 'GET_POSTS': {
      const count = Math.floor(action.value.articlesCount / 20) * 10;
      return {
        ...state,
        posts: [...action.value.articles],
        error: false,
        pageCount: count,
        page: action.page + 1,
        loading: false,
      };
    }
    case 'LOADING':
      return { ...state, loading: true };
    case 'ERROR':
      return { ...state, loading: false, error: true };
    case 'GET_ARTICLE':
      return { ...state, error: false, loading: false, article: action.value };
    case 'AUTH': {
      const image = action.value.image ? action.value.image : null;
      const email = action.value.email ? action.value.email : null;
      const username = action.value.username ? action.value.username : null;
      localStorage.setItem('token', action.value.token);
      return {
        ...state,
        error: false,
        token: action.value.token,
        username: username,
        image: image,
        email: email,
      };
    }
    case 'LOG_OUT':
      localStorage.clear();
      return { ...state, error: false, token: null, username: null, image: null, email: null };
    case 'CLEAR':
      return { ...state, article: null };
    default:
      return state;
  }
};

const store = createStore(reducer, enhancer);

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
