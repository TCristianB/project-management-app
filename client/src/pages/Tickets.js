import React from 'react'

import '../styles/Tickets.css'

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const Tickets = () => {
	return (
		<div className="tickets">
			<nav className="nav">
				<Header /> 
			</nav>
			<Sidebar />
			<main className="main">
				<div className="main__header">
					<h2>View All Tickets</h2>
					<select  className="main__filter--select" name="filter">
						<option value="all tickets">All tickets</option>
						<option value="my tickets">My tickets</option>
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
							<tr>
								<td>1</td>
								<td className="tickets__table--name">This is the name of the ticket</td>
								<td>Backend</td>
								<td>High</td>
								<td>John</td>
								<td>Project 1</td>
								<td>Mark</td>
								<td className="tickets__table--button">Click</td>
							</tr>
							
						</tbody>
					</table>
				</div>
			</main>
		</div>
	)
}

export default Tickets