import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './App.css'

import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import UpdateProfile from './pages/UpdateProfile'
import Register from './pages/Register'
import Login from './pages/Login'
import Projects from './pages/Projects'
import Project from './pages/Project'
import EditProject from './pages/EditProject'
import AssignDeveloper from './pages/AssignDeveloper'
import Tickets from './pages/Tickets'
import CreateProject from './pages/CreateProject'
import CreateTicket from './pages/CreateTicket'
import EditTicket from './pages/EditTicket'
import Ticket from './pages/Ticket'

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/'>
					<Redirect to='/dashboard' />
				</Route>
				<Route exact path='/dashboard' component={Dashboard}></Route>
				<Route exact path='/me' component={Profile}></Route>
				<Route exact path='/me/update' component={UpdateProfile}></Route>
				<Route exact path='/register' component={Register}></Route>
				<Route exact default path='/login' component={Login}></Route>
				<Route exact path='/projects' component={Projects}></Route>
				<Route exact path='/projects/:id' component={Project}></Route>
				<Route exact path='/projects/update/:id' component={EditProject}></Route>
				<Route exact path='/projects/:id/assign' component={AssignDeveloper}></Route>
				<Route exact path='/tickets' component={Tickets}></Route>
				<Route exact path='/tickets/:id' component={Ticket}></Route>
				<Route exact path='/new-project' component={CreateProject}></Route>
				<Route exact path='/new-ticket' component={CreateTicket}></Route>
				<Route exact path='/tickets/update/:id' component={EditTicket}></Route>
				<Route exact path='/register'></Route>
			</Switch>
		</Router>
	);
}

export default App
