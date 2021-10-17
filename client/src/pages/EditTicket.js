import React, { useState, useEffect } from 'react'
import { useHistory, useParams, Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'

import '../styles/CreateTicket.css'

import Header from '../components/Header'
import SideBar from '../components/Sidebar'

const schema = yup.object().shape({
	title: yup.string().required('Title is a required field'),
	description: yup.string().required('Description is a required field'),
	ticketProject: yup.string().required('Project is a required field'),
	ticketType: yup.string().required('Ticket type is a required field'),
	ticketPriority: yup.string().required('Ticket priority is a required field'),
	ticketDeveloper: yup.string().required('Ticket developer is a required field')
})

const CreateTicket = () => {
	const [users, setUsers] = useState([])
	const [projects, setProjects] = useState([])
	const [ticket, setTicket] = useState()
	const params = useParams()
	const userId = window.localStorage.getItem('UserId')
	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema)
	})
	const history = useHistory()

	useEffect(() => {
		axios.get('/api/users')
			.then(res => {
				setUsers(res.data)
			})
	}, [])

	useEffect(() => {
		axios.get('/api/projects')
			.then(res => {
				setProjects(res.data.projects)
			})
	}, [])
	useEffect(() => {
		axios.get(`/api/tickets/${params.id}`)
		.then(res => setTicket(res.data))
	}, [params])


	const submitForm = async (data) => {
		const ticketProject = data.ticketProject.split("|")[0]
		const ticketProjectName = data.ticketProject.split("|")[1]
		const ticketDeveloper = data.ticketDeveloper.split("|")[0]
		const ticketDeveloperName = data.ticketDeveloper.split("|")[1]
		const ticket = {
			...data,
			ticketProject,
			ticketProjectName,
			ticketDeveloper,
			ticketDeveloperName
		}
		axios.patch(`/api/tickets/${params.id}`, ticket)
			.then(() => {
				history.push('/tickets')
			})
			.catch(e => console.log(e))
	}

	if(ticket) {
		if(ticket.owner !== userId) {
			return <Redirect to={`/tickets`}/>
		}
	}
	
	return (
		<div className="create-ticket">
			<nav className="nav">
				<Header />
			</nav>
			<SideBar />
			<main className="main main_form">
				<h2>Edit a ticket</h2>
				{ticket && (
					<form onSubmit={handleSubmit(submitForm)}>
					<div className="main__form-section">
						<label htmlFor="title">Title</label><br />
						<input
							id="title"
							type="text"
							name="title"
							defaultValue={ticket.title}
							{...register('title', { required: 'Required' })}
						/>
						{errors.title && <p className="errors-message">{errors.title.message}</p>}
					</div>
					<div className="main__form-section">
						<label htmlFor="description">Description</label><br />
						<textarea
							rows="10"
							cols="30"
							name="description"
							defaultValue={ticket.description}
							{...register('description', { required: 'Required' })}
						></textarea>
						{errors.description && <p className="errors-message">{errors.description.message}</p>}
					</div>
					<div className="main__form-section">
						<label htmlFor="ticketType">Ticket Type</label><br />
						<select
							name="ticketType"
							defaultValue={ticket.ticketType}
							{...register('ticketType', { required: 'Required' })}
						>
							<option value="UI">UI</option>
							<option value="Frontend">Frontend</option>
							<option value="Backend">Backend</option>
						</select>
						{errors.ticketType && <p className="errors-message">{errors.ticketType.message}</p>}
					</div>
					<div className="main__form-section">
						<label htmlFor="ticketProject">Project</label><br />
						<select
							name="ticketProject"
							defaultValue={`${ticket.ticketProject}|${ticket.ticketProjectName}`}
							{...register('ticketProject', { required: 'Required' })}
						>
							{projects && projects.map(project => {
								const { _id, title } = project
								return <option key={_id} value={`${_id}|${title}`}>{title}</option>
							})}
						</select>
						{errors.ticketProject && <p className="errors-message">{errors.ticketProject.message}</p>}
					</div>
					<div className="main__form-section">
						<label htmlFor="ticketPriority">Ticket Priority</label><br />
						<select
							name="ticketPriority"
							defaultValue={ticket.ticketPriority}
							{...register('ticketPriority', { required: 'Required' })}
						>
							<option value="High">High</option>
							<option value="Medium">Medium</option>
							<option value="Low">Low</option>
						</select>
						{errors.ticketPriority && <p className="errors-message">{errors.ticketPriority.message}</p>}
					</div>
					<div className="main__form-section">
						<label htmlFor="ticketDeveloper">Assigned developer</label><br />
						<select
							name="ticketDeveloper"
							defaultValue={`${ticket.ticketDeveloper}|${ticket.ticketDeveloperName}`}
							{...register('ticketDeveloper', { required: 'Required' })}
						>
							{users && users.map((user) => {
								const { _id, name, lastName } = user
								return <option key={_id} value={_id}>{name} {lastName}</option>
							})}
						</select>
						{errors.ticketDeveloper && <p className="errors-message">{errors.ticketDeveloper.message}</p>}
					</div>
					<button className="main__form--button" type="submit">Edit ticket</button>
				</form>
				)}
			</main>
		</div>
	)
}

export default CreateTicket