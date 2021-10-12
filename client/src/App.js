import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './App.css'

import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Tickets from './pages/Tickets'
import CreateProject from './pages/CreateProject'
import CreateTicket from './pages/CreateTicket'

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/'>
					<Redirect to='/dashboard' />
				</Route>
				<Route exact path='/dashboard' component={Dashboard}></Route>
				<Route exact path='/projects' component={Projects}></Route>
				<Route exact path='/tickets' component={Tickets}></Route>
				<Route exact path='/new-project' component={CreateProject}></Route>
				<Route exact path='/new-ticket' component={CreateTicket}></Route>
				<Route exact default path='/login'></Route>
				<Route exact path='/register'></Route>
			</Switch>
		</Router>
	);
}

export default App
