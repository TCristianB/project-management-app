import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'

import '../styles/AssignDeveloper.css'

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

// Dummy db
import { usersData } from '../db'

const schema = yup.object().shape({
	userList: yup.string().required('User is a required field'),
})


const AssignDeveloper = () => {
	const { register, handleSubmit } = useForm({
		resolver: yupResolver(schema)
	})
	const [users, setUsers] = useState([])
	const [project, setProject] = useState([])
	const [error, setError] = useState('')
	const params = useParams()
	const history = useHistory()

	useEffect(() => {
		axios.get('/api/users') 
			.then((res) => setUsers(res.data))
	}, [])

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

	return (
		<div className="assign-developer">
			<nav className="nav">
				<Header />
			</nav>
			<Sidebar />
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
												/* value={`${_id}|${name}`} */
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
		</div>
	)
}

export default AssignDeveloper