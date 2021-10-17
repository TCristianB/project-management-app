import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

import '../styles/Profile.css'

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Loading from '../components/Loading'

const Profile = () => {
	const [me, setMe] = useState()

	useEffect(() => {
		axios.get('/api/users/me')
			.then(res => setMe(res.data))
			.catch(e => {
				console.log(e)
			})
	}, [])

	if (!me) {
		return <Loading />
	}

	return (
		<div className="profile">
			<nav className="nav">
				<Header />
			</nav>
			<Sidebar />
			<div className="main">
				<div className="main__header">
					<h2>{me.name} {me.lastName}</h2>
				</div>
				<div className="main__profile">
					<p className="main__profile--text">Email: <span>{me.email}</span></p>
					<Link to="/me/update" className="update-profile-button">Update profile</Link>
				</div>
			</div>
		</div>
	)
}

export default Profile