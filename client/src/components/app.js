import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../pages/home';
import Login  from '../pages/login';
import Register from '../pages/register';
import Dashboard from '../pages/dashboard';
import Navigation from './navigation';

class App extends  Component {
	render() {
		return (
			<BrowserRouter>
				<div className="container">
					<Navigation />
					<Switch>
						<Route path="/" exact component={ Home } />
						<Route path="/login" exact component={ Login } />
						<Route path="/register" exact component={ Register } />
						<Route path='/dashboard' component={Dashboard} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
