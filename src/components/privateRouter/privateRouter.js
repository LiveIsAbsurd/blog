import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { clearArticle } from '../../function/actions';

const PrivateRouter = ({ component: Component, token }) => {
  const dispatch = useDispatch();
  return (
    <Route
      render={() => {
        dispatch(clearArticle());
        return token ? <Component /> : <Redirect to="/sign-in" />;
      }}
    />
  );
};

export default PrivateRouter;
