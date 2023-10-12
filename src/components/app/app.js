import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getPosts } from '../../function/api';
import { loading } from '../../function/actions';
import Header from '../header';
import articlesRender from '../articlesRender/articlesRender';
import FullArticle from '../fullArticle';

import styles from './app.module.sass';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts(0));
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
                dispatch(loading());
                return <FullArticle slug={match.params.slug} />;
              }}
            />
            <Route path="/" component={articlesRender} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
