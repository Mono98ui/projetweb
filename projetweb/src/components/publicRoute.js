/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from '../utils/common';

export const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => !getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/profile' }} />}
  />
);
