import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Profile from '../pages/Profile'
import UpdateProfile from '../pages/UpdateProfile'
import Projects from '../pages/Projects'
import Project from '../pages/Project'
import EditProject from '../pages/EditProject'
import AssignDeveloper from '../pages/AssignDeveloper'
import Tickets from '../pages/Tickets'
import CreateProject from '../pages/CreateProject'
import CreateTicket from '../pages/CreateTicket'
import EditTicket from '../pages/EditTicket'
import Ticket from '../pages/Ticket'

import Header from './Header'
import Sidebar from './Sidebar'
import NotFound from './NotFound'

const Home = () => {
	return (
		<div className="container">
			<div className="nav">
				<Header />
			</div>
			<Sidebar />
			<Switch>
				<Route exact path='/' render={() => <Redirect to='/dashboard' />}></Route>
				<Route exact path='/dashboard' component={Dashboard}></Route>
				<Route exact path='/me' component={Profile}></Route>
				<Route exact path='/me/update' component={UpdateProfile}></Route>
				<Route exact path='/projects' component={Projects}></Route>
				<Route exact path='/projects/:id' component={Project}></Route>
				<Route exact path='/projects/update/:id' component={EditProject}></Route>
				<Route exact path='/projects/:id/assign' component={AssignDeveloper}></Route>
				<Route exact path='/tickets' component={Tickets}></Route>
				<Route exact path='/tickets/:id' component={Ticket}></Route>
				<Route exact path='/new-project' component={CreateProject}></Route>
				<Route exact path='/new-ticket' component={CreateTicket}></Route>
				<Route exact path='/tickets/update/:id' component={EditTicket}></Route>
				<Route component={NotFound}></Route>
			</Switch>
		</div>
	)
}

export default Home