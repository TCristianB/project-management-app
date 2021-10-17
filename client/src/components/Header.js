import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

import '../styles/Header.css'

import Notification from './Notification'

const Header = () => {
	const [errorMessage, setErrorMessage] = useState(null)

	const history = useHistory()

	const userName = window.localStorage.getItem('User')

	const logoutAdmin = async () => {
		try {
			await axios.post('/api/users/signOut')
				.then(() => {
					window.localStorage.removeItem('User')
					window.localStorage.removeItem('UserId')
					window.localStorage.removeItem('isAuthenticated')
					history.push('/login')
				})
		} catch (e) {
			setErrorMessage('Internal Server Error')
		}
	}

	return (
		<header className="header">
			<div className="user__data">
				<p className="user__data--name"><Link to="/me" className="user__profile-link">{userName}</Link></p>
				<Link to="/login" className="user__data--logout" onClick={logoutAdmin}>Logout</Link>
				{errorMessage && <Notification message={errorMessage} />}
			</div>
		</header>
	)
}

export default Header