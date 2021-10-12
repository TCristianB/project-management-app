import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './App.css'

import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/'>
					<Redirect to='/dashboard' />
				</Route>
				<Route exact path='/dashboard' component={Dashboard}></Route>
				<Route exact path='/projects' component={Projects}></Route>
				<Route exact default path='/login'></Route>
				<Route exact path='/register'></Route>
			</Switch>
		</Router>
	);
}

export default App
