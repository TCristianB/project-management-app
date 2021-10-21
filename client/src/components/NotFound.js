import React from 'react'
import { useHistory } from 'react-router-dom'

const NotFound = () => {
	const history = useHistory()
	const isAuthenticated = window.localStorage.getItem('isAuthenticated')

	if (isAuthenticated === null) {
		history.push('/login')
	}
	return (
		<div className="main">
			<h2 id="NotFound__title">404 not found</h2>
		</div>
	)
}

export default NotFound