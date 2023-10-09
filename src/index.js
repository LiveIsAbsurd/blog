import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createRoot } from 'react-dom/client';

import App from './components/app/';

const inState = {
  posts: [],
  articlesCount: 20,
  loading: true,
};

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const reducer = (state = inState, action) => {
  switch (action.type) {
    case 'GET_POSTS':
      return { ...state, posts: [...action.value.articles], articlesCount: action.value.articlesCount, loading: false };
    case 'NEW_PAGE':
      return { ...state, loading: true };
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
