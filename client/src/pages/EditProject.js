import React, {useState, useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'

import '../styles/CreateProject.css'

import Header from '../components/Header'
import SideBar from '../components/Sidebar'

const schema = yup.object().shape({
	title: yup.string().required('Title is a required field'),
	description: yup.string().required('Description is a required field'),
})


const EditProject = () => {
	const [projectData, setProjectData] = useState()
	const params = useParams()
	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema)
	})
	const history = useHistory()

	useEffect(() => {
		axios.get(`/api/projects/${params.id}`)
			.then(res => {
				setProjectData(res.data)
			}).catch(e => {
				if(e.response.status === 404) {
					
				}
				console.log(e.response.status)
			})
	}, [params])

	const submitForm = (data) => {
		console.log(data)
		try {
			axios.patch(`/api/projects/${params.id}`, data)
			.then(() => {
				history.push('/projects')
			})
		} catch(e) {
			console.log(e)
		}
		
	}

	return (
		<div className="create-project">
			<nav className="nav">
				<Header />
			</nav>
			<SideBar />
			{projectData && (
				<main className="main main_form">
				<h2>Edit Project</h2>
				<form onSubmit={handleSubmit(submitForm)}>
					<div className="main__form-section">
						<label htmlFor="project-title">Title</label><br />
						<input
							id="project-title"
							type="text"
							name="title"
							defaultValue={projectData.title}
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
							defaultValue={projectData.description}
							{...register('description', { required: 'Required' })}
						></textarea>
						{errors.description && <p className="errors-message">{errors.description.message}</p>}
					</div>
					<button className="main__form--button" type="submit">Update project</button>
				</form>
			</main>
			)}
		</div >
	)
}

export default EditProject