import React, { useState, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

import '../styles/Project.css'

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const Project = () => {
	const [project, setProject] = useState()
	const [tickets, setTickets] = useState([])
	const [errorMessage, setErrorMessage] = useState('')
	const params = useParams()
	const history = useHistory()
	let checkOwner = true
	const userId = window.localStorage.getItem('UserId')



	// Get project data
	useEffect(() => {
		try {
			axios.get(`/api/projects/${params.id}`)
				.then((res) => {
					setProject(res.data)
				})
		} catch (e) {
			console.log(e)
		}
	}, [params])

	// Get all projects tickets
	useEffect(() => {
		try {
			axios.get('/api/tickets')
				.then((res) => {
					let projectTickets = res.data
					projectTickets = projectTickets.filter(ticket => ticket.ticketProject === params.id)
					setTickets(projectTickets)
				})
		} catch (e) {
			console.log(e)
		}
	}, [params])


	// Setting the date
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
		"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
	];
	let dateProject
	const getAllDates = () => {
		let date = new Date(project.createdAt)
		date = `${date.getDate()} ${months[date.getMonth()]}`
		dateProject = date
	}

	// Delete a ticket
	const deleteTicket = (id) => {
		axios.delete(`/api/tickets/${id}`)
			.then(() => {
				setTickets(tickets.filter((user) => {
					return user._id !== id
				}))
			})
			.catch(e => {

			})
	}

	// Delete a user
	const deleteUser = (id) => {
		const developers = project.developers.filter(developer => developer._id !== id)
		const updateProject = {
			developers: [...developers]
		}

		axios.patch(`/api/projects/${params.id}`, updateProject)
			.then((res) => {
				const newDevelopers = project.developers.filter((developer) => {
					return developer._id !== id
				})
				const newUpdatedProject = {
					...res.data,
					developers: [...newDevelopers]
				}
				setProject(newUpdatedProject)
			})
			.catch((e) => console.log(e))
	}

	// Delete the project
	const deleteProject = () => {
		axios.delete(`/api/projects/${params.id}`)
			.then(() => {
				history.push('/projects')
			})
			.catch(e => {
				if (e.response.status === 404) {
					setErrorMessage('You can\'t delete a project that is not yours')
				}
				setTimeout(() => {
					setErrorMessage('')
				}, 3000)
			})

	}
	if (project) {
		getAllDates()
		if (project.owner !== userId) {
			checkOwner = false
		}
	}
	return (
		<div className="projects">
			<nav className="nav">
				<Header />
			</nav>
			<Sidebar />
			<div className="main">
				{project &&
					(
						<div className="main-projects__nav">
							<h2 className="project__title">{project.title}</h2>
							<div className="project__data">
								<p>{project.description}</p>
								<p>Project created by {project.ownerName}</p>
								<p>Created on {dateProject}</p>
								<p>The are {project.developers.length} users on this project</p>
								<div className="project__data--card">
									<p className="users__title">Users on this project</p>
									<ul className="project__data--list">
										{project.developers && project.developers.map((developer) => {
											const { _id, name } = developer
											return <li
												key={_id}
												className="list__item">{name} <button type="button" onClick={() => deleteUser(_id)} className="delete-button">Delete</button></li>
										})}
									</ul>
								</div>
								{checkOwner && (
									<div>
										<Link to={`/projects/${project._id}/assign`} className="main-project__action--button card__button">Assign developers</Link><br />
										<button onClick={deleteProject} className="main-project__action--button card__button delete-project-button">Delete project</button>
									</div>
								)}
							</div>
							<table className="main__tickets--table">
								<thead>
									<tr>
										<th>Id</th>
										<th>Ticket Name</th>
										<th>Ticket Type</th>
										<th>Ticket Priority</th>
										<th>Assigned To</th>
										<th>Project</th>
										<th>Owner</th>
									</tr>
								</thead>
								<tbody>
									{tickets && tickets.map((ticket, index) => {
										const { _id, title, ticketType, ticketPriority, ticketProjectName, ownerName, ticketDeveloperName } = ticket
										return (
											<tr key={_id}>
												<td>{index}</td>
												<td className="tickets__table--name">{title}</td>
												<td>{ticketType}</td>
												<td>{ticketPriority}</td>
												<td>{ticketDeveloperName}</td>
												<td>{ticketProjectName}</td>
												<td>{ownerName}</td>
												<td className="tickets__table--button">Click</td>
												<td className="item-table tickets__table--button"><Link to={`/tickets/update/${_id}`} className="edit-button">Edit</Link></td>
												<td className="item-table tickets__table--button"><button onClick={() => deleteTicket(_id)} className="delete-button">Delete</button></td>
											</tr>
										)
									})}
								</tbody>
							</table>
						</div>
					)}
			</div>
		</div>
	)
}

export default Project