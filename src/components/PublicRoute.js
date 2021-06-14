import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { authSelectors } from '../redux/auth';

/**
 * - Если маршрут ограниченный, и пользователь залогинен, рендерит редирект на /contacts
 * - В противном случае рендерит компонент
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
			{true && routeProps.restricted ? (
				<Redirect to={redirectTo} />
			) : (
				children
			)}
		</Route>
	);
};