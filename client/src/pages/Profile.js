import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

import '../styles/Profile.css'

import Loading from '../components/Loading'

const Profile = () => {
	const [me, setMe] = useState()
	const history = useHistory()

	useEffect(() => {
		const checkUser = document.cookie.split("=")[1]
		if(checkUser !== "true") {
			return history.push('/login')
		}
		axios.get('/api/users/me')
			.then(res => setMe(res.data))
			.catch(e => {
				console.log(e)
			})
	}, [history])

	if (!me) {
		return <Loading />
	}

	return (
		<div className="main">
			<div className="main__header">
				<h2>{me.name} {me.lastName}</h2>
			</div>
			<div className="main__profile">
				<p className="main__profile--text">Email: <span>{me.email}</span></p>
				<Link to="/me/update" className="update-profile-button">Update profile</Link>
			</div>
		</div>
	)
}

export default Profile