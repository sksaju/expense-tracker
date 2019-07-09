import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../pages/home';
import Login  from '../pages/login';
import Register from '../pages/register';

class App extends  Component {
	render() {
		return (
			<BrowserRouter>
				<div className="container">
					<Switch>
						<Route path="/" exact component={ Home } />
						<Route path="/login" exact component={ Login } />
						<Route path="/register" exact component={ Register } />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
