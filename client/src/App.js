import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'

import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'

import Home from './components/Home'

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/register' component={() => <Register />}></Route>
				<Route exact default path='/login' component={() => <Login />}></Route>
				<Route component={Home}></Route>
			</Switch>
		</Router>
	);
}

export default App
