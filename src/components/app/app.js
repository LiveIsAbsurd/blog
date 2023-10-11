import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { loading } from '../../function/actions';
import Header from '../header';
import List from '../list/list';
import FullArticle from '../fullArticle';

import styles from './app.module.sass';

const App = () => {
  const dispatch = useDispatch();
  return (
    <Router>
      <div>
        <Header />
        <div className={styles.main}>
          <Switch>
            <Route exact path="/articles">
              <List />
            </Route>
            <Route
              path="/article/:slug"
              render={({ match }) => {
                dispatch(loading());
                return <FullArticle slug={match.params.slug} />;
              }}
            />
            <Route path="/">
              <List />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
