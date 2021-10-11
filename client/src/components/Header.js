import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/Header.css'

const Header = () => {
	return (
		<header className="header">
			<div className="user__data">
				<p className="user__data--name">Username</p>
				<p className="user__data--role">Role</p>
			</div>
		</header>
	)
}

export default Header