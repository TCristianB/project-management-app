import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Dashboard from '../pages/Dashboard/Dashboard'
import Profile from '../pages/Profile/Profile'
import UpdateProfile from '../pages/Profile/UpdateProfile'
import Projects from '../pages/Project/Projects'
import Project from '../pages/Project/Project'
import EditProject from '../pages/Project/EditProject'
import AssignDeveloper from '../pages/Project/AssignDeveloper'
import Tickets from '../pages/Ticket/Tickets'
import CreateProject from '../pages/Project/CreateProject'
import CreateTicket from '../pages/Ticket/CreateTicket'
import EditTicket from '../pages/Ticket/EditTicket'
import Ticket from '../pages/Ticket/Ticket'

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