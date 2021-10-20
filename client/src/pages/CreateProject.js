import React from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'

import '../styles/CreateProject.css'

const schema = yup.object().shape({
	title: yup.string().required('Title is a required field'),
	description: yup.string().required('Description is a required field'),
})

const CreateProject = () => {
	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema)
	})
	const history = useHistory()

	const isAuthenticated = window.localStorage.getItem('isAuthenticated')
	const userName = window.localStorage.getItem('User')

	const submitForm = (data) => {
		const newData = {
			...data,
			ownerName: userName
		}
		axios.post('/api/projects', newData)
			.then(() => {
				history.push('/projects')
			})
	}

	if (!isAuthenticated) {
		return <Redirect to="/login" />
	}

	return (
		<main className="main main_form">
			<h2>Create a new Project</h2>
			<form onSubmit={handleSubmit(submitForm)}>
				<div className="main__form-section">
					<label htmlFor="project-title">Title</label><br />
					<input
						id="project-title"
						type="text"
						name="title"
						{...register('title', { required: 'Required' })}
					></input>
					{errors.title && <p className="errors-message">{errors.title.message}</p>}
				</div>
				<div className="main__form-section">
					<label htmlFor="description">Description</label><br />
					<textarea
						rows="10"
						cols="30"
						name="description"
						{...register('description', { required: 'Required' })}
					></textarea>
					{errors.description && <p className="errors-message">{errors.description.message}</p>}
				</div>
				<button className="main__form--button" type="submit">Create project</button>
			</form>
		</main>
	)
}

export default CreateProject