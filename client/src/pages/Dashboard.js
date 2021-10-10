import React from 'react'

import '../styles/Dashboard.css'

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
	return (
		<div>
			<nav className='nav'>
				<Header />
			</nav>
			<Sidebar />
		</div>
	)
}

export default Dashboard