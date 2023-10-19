import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getPosts } from '../../function/api';
import { authentication } from '../../function/actions';
import Header from '../header';
import articlesRender from '../articlesRender/articlesRender';
import FullArticle from '../fullArticle';
import SignUp from '../signUp';
import SignIn from '../signIn';
import Profile from '../Profile';

import styles from './app.module.sass';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts(0));
    if (localStorage.getItem('token') !== null) {
      dispatch(authentication({ token: localStorage.getItem('token') }));
    }
  }, []);

  return (
    <Router>
      <div>
        <Header />
        <div className={styles.main}>
          <Switch>
            <Route exact path="/articles" component={articlesRender} />
            <Route
              path="/article/:slug"
              render={({ match }) => {
                return <FullArticle slug={match.params.slug} />;
              }}
            />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/profile" component={Profile} />
            <Route path="/" component={articlesRender} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
