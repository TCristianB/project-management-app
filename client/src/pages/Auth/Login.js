import React, { useState } from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'

import './Auth.css'

import Notification from '../../components/Notification'

const schema = yup.object().shape({
	email: yup.string().email().required('Email is a required field'),
	password: yup.string().required('Password is a required field'),
})

const Login = () => {
	const [errorMessage, setErrorMessage] = useState(null)
	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema)
	})

	const isAuthenticated = JSON.parse(window.localStorage.getItem('isAuthenticated'))
	const history = useHistory()

	const submitForm = async (data) => {
		try {
			await axios.post('/api/users/signIn', data, { withCredentials: true })
				.then((res) => {
					if(res.data.email === 'demo@example.com') {
						window.localStorage.setItem('isDemo', JSON.stringify(true))
					}
					// Sending the user data to localStorage
					window.localStorage.setItem('User', res.data.name)
					window.localStorage.setItem('UserId', res.data.id)
					window.localStorage.setItem('isAuthenticated', JSON.stringify(true))
				})
			history.push('/dashboard')
		} catch (e) {
			setErrorMessage('Email or password incorrect')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const logDemoAccount = async () => {
		const demoAccountData = {
            email: 'demo@example.com',
            password: 'test'
        }
		try {
            await axios.post('/api/users/signIn', demoAccountData)
                .then((res) => {
                    if(res.data.email === 'demo@example.com') {
						window.localStorage.setItem('isDemo', JSON.stringify(true))
					}
					// Sending the user data to localStorage
					window.localStorage.setItem('User', res.data.name)
					window.localStorage.setItem('UserId', res.data.id)
					window.localStorage.setItem('isAuthenticated', JSON.stringify(true))
                })
            history.push('/dashboard')
        } catch (e) {
            setErrorMessage('Email or password incorrect')
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
				<h2 className="auth__container--title">Login</h2>
				<form className="form__container" onSubmit={handleSubmit(submitForm)}>
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
					<button className="main__form--button">Login</button>
					<p className="main__form--redirect">Do you not have an account? <Link to="/register">Register</Link></p>
				</form>
				<button className="main__form--button" onClick={logDemoAccount}>Use a demo account</button>
			</div>
		</div>
	)
}

export default Login