/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from '../utils/common';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest} render={props => (
      getToken()
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )}
  />
);
