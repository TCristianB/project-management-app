import React from 'react'
import { Link } from 'react-router-dom'

const TicketTable = ({ tickets, userId, pagesVisited, usersPerPage, ReactPaginate, pageCount, changePage, deleteTicket, passClass }) => {
	return (
		<>
			<table className={passClass}>
				<thead>
					<tr>
						<th className="item-table">#</th>
						<th className="item-table">Ticket Name</th>
						<th className="item-table">Ticket Type</th>
						<th className="item-table">Ticket Priority</th>
						<th className="item-table">Assigned To</th>
						<th className="item-table">Project</th>
						<th className="item-table">Owner</th>
					</tr>
				</thead>
				<tbody>
					{tickets.length > 0 && tickets.slice(pagesVisited, pagesVisited + usersPerPage).map((ticket, index) => {
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
		</>
	)
}

export default TicketTable