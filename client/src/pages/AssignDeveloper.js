import React, { useState, useEffect } from 'react'
import { useParams, useHistory, Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'

import '../styles/AssignDeveloper.css'

const schema = yup.object().shape({
	userList: yup.string().required('User is a required field'),
})


const AssignDeveloper = () => {
	const { register, handleSubmit } = useForm({
		resolver: yupResolver(schema)
	})
	const [users, setUsers] = useState([])
	const [project, setProject] = useState()
	const [error, setError] = useState('')
	const params = useParams()
	const history = useHistory()

	const userId = window.localStorage.getItem('UserId')

	useEffect(() => {
		const checkUser = document.cookie.split("=")[1]
		if(checkUser !== "true") {
			return history.push('/login')
		}
		axios.get('/api/users')
			.then((res) => setUsers(res.data))
	}, [history])

	useEffect(() => {
		axios.get(`/api/projects/${params.id}`)
			.then((res) => {
				setProject(res.data)
			})
	}, [params])

	const submitForm = (data) => {
		const idUser = data.userList.split("|")[0]
		const nameUser = data.userList.split("|")[1]
		let checkUserExist = false

		for (let i = 0; i < project.developers.length; i++) {
			if (project.developers[i]._id === idUser) {
				checkUserExist = true
			}
		}

		if (checkUserExist) {
			setError('User is already in the project')
			return setTimeout(() => {
				setError('')
			}, 3000)
		} else {
			const projectData = {
				developers: [...project.developers, {
					_id: idUser, name: nameUser
				}]
			}
			axios.patch(`/api/projects/${params.id}`, projectData)
				.then(() => {
					history.push(`/projects/${params.id}`)
				})
				.catch((e) => {
					console.log(e)
				})
		}
	}

	if (project) {
		if (project.owner !== userId) {
			return <Redirect to={`/projects/${params.id}`} />
		}
	}

	return (
		<div className="main">
			<div className="main-projects__nav">
				<h2>Assign developers</h2>
				<div className="project-data">
					<form className="project__data--card assign-user" onSubmit={handleSubmit(submitForm)}>
						<label className="users__title">Users</label>
						<ul className="project__data--list users-list">
							{users && users.map((user) => {
								const { _id, name, lastName } = user
								return (
									<li key={_id} className="user-list">
										<input
											type="radio"
											name="userList"
											defaultValue={`${_id}|${name} ${lastName}`}
											{...register('userList', { required: 'Required' })}
										/>
										{name} {lastName}
									</li>
								)
							})}
						</ul>
						<p className="errors-message">{error}</p>
						<button type="submit" className="main__form--button">Assign</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default AssignDeveloper