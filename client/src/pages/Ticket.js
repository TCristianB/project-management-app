import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useParams } from 'react-router'
import axios from 'axios'

import '../styles/Ticket.css'

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const Ticket = () => {
	const [ticket, setTicket] = useState()
	const params = useParams()
	const history = useHistory()
	const userId = window.localStorage.getItem('UserId')

	useEffect(() => {
		axios.get(`/api/tickets/${params.id}`)
			.then(res => setTicket(res.data))
	}, [params])


	// Setting the date
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
		"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
	];
	let dateProject
	let checkOwner = true
	if (ticket) {
		let date = new Date(ticket.createdAt)
		date = `${date.getDate()} ${months[date.getMonth()]}`
		dateProject = date
		if (ticket.owner !== userId) {
			checkOwner = false
		}
	}


	const deleteTicket = (id) => {
		axios.delete(`/api/tickets/${id}`)
			.then(() => {
				history.push('/tickets')
			})
			.catch(e => console.log(e))
	}


	if (!ticket) {
		return (
			<div className="tickets">
				<nav className="nav">
					<Header />
				</nav>
				<Sidebar />
				<div className="main">
					<div className="main__header">
						<p>Loading...</p>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="tickets">
			<nav className="nav">
				<Header />
			</nav>
			<Sidebar />
			<div className="main">
				<div className="main__header">
					<h2>{ticket.title}</h2>
				</div>
				<div className="main__ticket">
					<p className="main__ticket--text">{ticket.description}</p>
					<p className="main__ticket--text">Ticket tpye: <span>{ticket.ticketType}</span> </p>
					<p className="main__ticket--text">Ticket priority: <span>{ticket.ticketPriority}</span></p>
					<p className="main__ticket--text">Project: <span>{ticket.ticketProjectName}</span></p>
					<p className="main__ticket--text">Assigned to <span>{ticket.ticketDeveloperName}</span></p>
					<p className="main__ticket--text">Created on <span>{dateProject}</span></p>
					<p className="main__ticket--text">Created by <span>{ticket.ownerName}</span></p>
					{checkOwner && (
						<>
							<p className="main__ticket--text">
								<Link to={`/tickets/update/${ticket._id}`} className="edit-button">Edit</Link><br />
								<br />
								<button onClick={() => deleteTicket(ticket._id)} className="delete-button">Delete</button>
							</p>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default Ticket