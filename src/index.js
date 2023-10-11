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
  article: null,
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
      return { ...state, posts: [...action.value.articles], pageCount: count, page: action.page + 1, loading: false };
    }
    case 'LOADING':
      return { ...state, loading: true };
    case 'GET_ARTICLE':
      return { ...state, loading: false, article: action.value };
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
