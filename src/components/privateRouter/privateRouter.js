import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRouter = ({ component: Component, token }) => {
  return <Route render={() => (token ? <Component /> : <Redirect to="/sign-in" />)} />;
};

export default PrivateRouter;
