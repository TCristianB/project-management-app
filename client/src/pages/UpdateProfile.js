import React, { useState, useEffect } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'

import '../styles/Auth.css'

import Notification from '../components/Notification'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Loading from '../components/Loading'

const schema = yup.object().shape({
	name: yup.string().required('Name is a required field'),
	lastName: yup.string().required('Last name is a required field'),
	email: yup.string().email().required('Email is a required field'),
})

const isAuthenticated = window.localStorage.getItem('isAuthenticated')

const Register = () => {
	const [errorMessage, setErrorMessage] = useState(null)
	const [me, setMe] = useState()
	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema)
	})

	const history = useHistory()

	useEffect(() => {
		axios.get('/api/users/me')
			.then(res => setMe(res.data))
	}, [])

	if (!me) {
		return <Loading />
	}


	const submitForm = async (data) => {

		try {
			await axios.patch('/api/users/me', data, { withCredentials: true })
				.then((res) => {
					window.localStorage.setItem('User', res.data.name)
					history.push('/me')
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

	if (!isAuthenticated) {
		return <Redirect to="/login" />
	}

	return (
		<div className="profile">
			<div className="nav">
				<Header />
			</div>
			<Sidebar />
			<div className="main">
				<div className="main__header">
					{errorMessage && <Notification message={errorMessage} />}
					<h2 className="auth__container--title">Update profile</h2>
				</div>
				<div className="main__profile">
					<form className="form__container form__update-user" onSubmit={handleSubmit(submitForm)}>
						<div className="form__container--field">
							<label htmlFor="name">Name</label><br />
							<input
								id="name"
								name="name"
								type="text"
								defaultValue={me.name}
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
								defaultValue={me.lastName}
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
								defaultValue={me.email}
								{...register('email', { required: 'Required' })}
							/>
							{errors.email && <p className="errors-message">{errors.email.message}</p>}
						</div>
						<button type="submit" className="main__form--button">Update user</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Register