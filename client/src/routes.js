import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {LinksPage} from './pages/LinksPage';
import {DetailPage} from './pages/DetailPage';
import {CreatePage} from './pages/CreatePage';

export const useRoutes = isAuthenticated => {
	if(isAuthenticated) {
		return (
			<Switch>
				<Route exact path="/links">
					<LinksPage/>
				</Route>
				<Route exact path="/create">
					<CreatePage/>
				</Route>
				<Route path="/detail/:id">
					<DetailPage/>
				</Route>
			</Switch>
		)
	}

	return (
		<Switch></Switch>
	)
};
