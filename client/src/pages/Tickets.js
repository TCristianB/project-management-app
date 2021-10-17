import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ReactPaginate from 'react-paginate'

import '../styles/Tickets.css'

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const Tickets = () => {
	const [tickets, setTickets] = useState([])
	const [pageNumber, setPageNumber] = useState(0)
	const [searchTerm, setSearchTerm] = useState('')

	useEffect(() => {
		axios.get('/api/tickets')
			.then(res => {
				setTickets(res.data)
			})
	}, [])

	const userId = window.localStorage.getItem('UserId')
	const usersPerPage = 10
	const pagesVisited = pageNumber * usersPerPage
	const pageCount = Math.ceil(tickets.length / usersPerPage)
	const changePage = ({ selected }) => {
		setPageNumber(selected)
	}

	const deleteTicket = (id) => {
		axios.delete(`/api/tickets/${id}`)
			.then(() => {
				setTickets(tickets.filter((user) => {
					return user._id !== id
				}))
			})
			.catch(e => console.log(e))
	}

	return (
		<div className="tickets">
			<nav className="nav">
				<Header />
			</nav>
			<Sidebar />
			<main className="main">
				<div className="main__header">
					<h2>View All Tickets</h2>
					<select className="main__filter--select" name="filter" onChange={(event) => setSearchTerm(event.target.value)}>
						<option value="all-tickets">All tickets</option>
						<option value="my-tickets">My tickets</option>
					</select>
				</div>
				<div className="main__tickets">
					<table className="main__tickets--table ticket_table">
						<thead>
							<tr>
								<th>Id</th>
								<th>Ticket name</th>
								<th>Ticket Type</th>
								<th>Ticket Priority</th>
								<th>Assigned To</th>
								<th>Project</th>
								<th>Owner</th>
							</tr>
						</thead>
						<tbody>
							{tickets.length > 0 && tickets.filter((val) => {
								// Filtering ticket 
								if (searchTerm === "") {
									return val
								} else if (searchTerm === 'my-tickets') {
									if (userId === val.owner) {
										return val
									}
									return null
								} else if (searchTerm === 'all-tickets') {
									return val
								} else {
									return null
								}

							}).slice(pagesVisited, pagesVisited + usersPerPage).map((ticket, index) => {
								const { _id, title, ticketType, ticketPriority, ticketProjectName, ownerName, ticketDeveloperName, owner } = ticket
								let checkOwner = true

								// Check if userId is equal to the owner of the project
								// If it's true the user should be able to edit an delete the ticket
								if (owner !== userId) {
									checkOwner = false
								}
								
								return (
									<tr key={_id}>
										<td className="item-table">{index}</td>
										<td className="item-table tickets__table--name">{title}</td>
										<td className="item-table">{ticketType}</td>
										<td className="item-table">{ticketPriority}</td>
										<td className="item-table">{ticketDeveloperName}</td>
										<td className="item-table">{ticketProjectName}</td>
										<td className="item-table">{ownerName}</td>
										{checkOwner && (
											<>
												<td className="item-table tickets__table--button"><Link to={`/tickets/update/${_id}`} className="edit-button">Edit</Link></td>
												<td className="item-table tickets__table--button"><button onClick={() => deleteTicket(_id)} className="delete-button">Delete</button></td>
											</>
										)}
									</tr>
								)
							})}
						</tbody>
					</table>
					<ReactPaginate
						previousLabel={"Previous"}
						nextLabel={"Next"}
						pageCount={pageCount}
						onPageChange={changePage}
						containerClassName={"paginationBtns"}
						previousClassName={"previousBtn"}
						nextLinkClassName={"nextBtn"}
						disabled={"paginationDisable"}
						activeClassName={"paginationActive"}
					/>
				</div>
			</main>
		</div>
	)
}

export default Tickets