import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getPosts } from '../../function/api';
import { authentication } from '../../function/actions';
import Header from '../header';
import ArticlesRender from '../articlesRender/articlesRender';
import FullArticle from '../fullArticle';
import SignUp from '../signUp';
import SignIn from '../signIn';
import Profile from '../Profile';
import EditArticle from '../editArticle';
import PrivateRouter from '../privateRouter';
import Error from '../error';

import styles from './app.module.sass';

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const page = useSelector((state) => state.page);
  // const loading = useSelector((state) => state.loading);

  useEffect(() => {
    if (localStorage.getItem('token') !== null && !token) {
      dispatch(authentication({ token: localStorage.getItem('token') }));
    }
  }, [token]);

  return (
    <Router>
      <div>
        <Header token={token} />
        <div className={styles.main}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                dispatch(getPosts(0, token));
                return <ArticlesRender />;
              }}
            />
            <Route
              exact
              path="/articles"
              render={() => {
                dispatch(getPosts((page - 1) * 20, token));
                return <ArticlesRender />;
              }}
            />
            <Route
              path="/article/:slug"
              render={({ match }) => {
                return <FullArticle slug={match.params.slug} />;
              }}
            />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/profile" component={Profile} />
            <PrivateRouter path="/new-article" component={EditArticle} token={token} />
            <Route
              exact
              path="/articles/:slug/edit"
              render={({ match }) => {
                return <EditArticle slug={match.params.slug} />;
              }}
            />
            <Route path="/error" component={Error} />
            <Redirect to="/articles" />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
