import React, { useState } from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'

import './Auth.css'

import Notification from '../../components/Notification'

const schema = yup.object().shape({
	name: yup.string().required('Name is a required field'),
	lastName: yup.string().required('Last name is a required field'),
	email: yup.string().email().required('Email is a required field'),
	password: yup.string().min(4).max(15).required('Password is a required field'),
})

const Register = () => {
	const [errorMessage, setErrorMessage] = useState(null)
	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema)
	})

	const isAuthenticated = JSON.parse(window.localStorage.getItem('isAuthenticated'))
	const history = useHistory()

	const submitForm = async (data) => {
		try {
			await axios.post('/api/users/signUp', data, { withCredentials: true })
				.then((res) => {
					window.localStorage.setItem('User', res.data.name)
					window.localStorage.setItem('UserId', res.data.id)
					window.localStorage.setItem('isAuthenticated', JSON.stringify(true))
					history.push('/dashboard')
				})
		} catch (e) {
			if (e.response.status === 409) {
				setErrorMessage('Email already exists')
			} else {
				setErrorMessage('Bad request')
			}
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	if (isAuthenticated) {
		return <Redirect to="/dashboard" />
	}
	
	return (
		<div className="auth">
			<div className="auth__container">
				{errorMessage && <Notification message={errorMessage} />}
				<h2 className="auth__container--title">Register</h2>
				<form className="form__container" onSubmit={handleSubmit(submitForm)}>
					<div className="form__container--field">
						<label htmlFor="name">Name</label><br />
						<input
							id="name"
							name="name"
							type="text"
							{...register('name', { required: 'Required' })}
						/>
						{errors.name && <p className="errors-message">{errors.name.message}</p>}
					</div>
					<div className="form__container--field">
						<label htmlFor="lastName">Last name</label><br />
						<input
							id="lastName"
							name="lastName"
							type="text"
							{...register('lastName', { required: 'Required' })}
						/>
						{errors.lastName && <p className="errors-message">{errors.lastName.message}</p>}
					</div>
					<div className="form__container--field">
						<label htmlFor="email">Email</label><br />
						<input
							id="email"
							name="email"
							type="email"
							{...register('email', { required: 'Required' })}
						/>
						{errors.email && <p className="errors-message">{errors.email.message}</p>}
					</div>
					<div className="form__container--field">
						<label htmlFor="password">Password</label><br />
						<input
							id="password"
							name="password"
							type="password"
							{...register('password', { required: 'Required' })}
						/>
						{errors.password && <p className="errors-message">{errors.password.message}</p>}
					</div>
					<button className="main__form--button">Register</button>
					<p className="main__form--redirect">Already register? <Link to="/login">Login</Link></p>
				</form>
			</div>
		</div>
	)
}

export default Register