import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { authSelectors } from '../redux/auth';

/**
 * - If the route is limited and the user is logged in, renders a redirect to/contacts
 * - Else render the component
 */
export default function PublicRoute({
  isAuthenticated,
  redirectTo,
  children,
  ...routeProps
}) {
  // const isLoggedIn = useSelector(authSelectors.getIsAuthenticated);

  return (
    <Route {...routeProps}>
      {true && routeProps.restricted ? <Redirect to={redirectTo} /> : children}
    </Route>
  );
}
