import React from 'react'

import '../styles/Dashboard.css'

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const Loading = () => {
	return (
		<div className="dashboard">
			<nav className="nav">
				<Header />
			</nav>
			<Sidebar />
			<div className="main">
				<h3>Loading...</h3>
			</div>
		</div>
	)
}

export default Loading