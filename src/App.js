import 'modern-normalize/modern-normalize.css';
import React, { Component, Suspense, lazy } from 'react';
import { Switch } from 'react-router-dom';
import PublicRoute from './components/PublicRoute';
import Spinner from '../src/components/Spinner';
const PhoneBookPage = lazy(() => import('./pages/PhoneBookPage'));
export default class App extends Component {	
	render() {	
    return (
			<>
        <Suspense fallback={Spinner}>
					<Switch>					
						<PublicRoute
								path="/"
							redirectTo=""
							><PhoneBookPage />
						</PublicRoute >
          </Switch>
        </Suspense>
      </>
    );
  }
}


