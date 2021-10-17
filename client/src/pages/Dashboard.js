import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Bar, Pie } from 'react-chartjs-2'
import ReactPaginate from 'react-paginate'

import '../styles/Dashboard.css'

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
	const [tickets, setTickets] = useState([])
	const [pageNumber, setPageNumber] = useState(0)
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
		"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
	];

	useEffect(() => {
		axios.get('/api/tickets')
			.then(res => {
				setTickets(res.data)
			})
	}, [])

	const counts = {}
	const getAllDates = () => {
		const dates = []
		for (let i = 0; i < tickets.length; i++) {
			let date = new Date(tickets[i].createdAt)
			date = `${date.getDate()} ${months[date.getMonth()]}`
			dates.push(date)
		}
		dates.forEach((date) => {
			return counts[date] = (counts[date] || 0) + 1
		})
	}

	const countsPriority = {}
	const countsType = {}
	const getPriorityAndType = () => {
		const priorityCount = []
		const typeCount = []

		for (let i = 0; i < tickets.length; i++) {
			priorityCount.push(tickets[i].ticketPriority)
			typeCount.push(tickets[i].ticketType)
		}

		const counts = (array, countsObject) => {
			array.forEach((item) => countsObject[item] = (countsObject[item] || 0) + 1)
		}
		counts(priorityCount, countsPriority)
		counts(typeCount, countsType)
		console.log({
			countsPriority,
			countsType
		})
	}

	const usersPerPage = 6
	const pagesVisited = pageNumber * usersPerPage
	const pageCount = Math.ceil(tickets.length / usersPerPage)
	const changePage = ({ selected }) => {
		setPageNumber(selected)
	}

	// Delete a ticket
	const deleteTicket = (id) => {
		axios.delete(`/api/tickets/${id}`)
			.then(() => {
				setTickets(tickets.filter((user) => {
                    return user._id !== id
                }))
			})
			.catch(e => console.log(e))
	}

	if (tickets.length > 0) {
		getAllDates()
		getPriorityAndType()
	}

	return (
		<div className="dashboard">
			<nav className='nav'>
				<Header />
			</nav>
			<Sidebar />
			<main className="main">
				<h2>Dashboard</h2>
				<div className="main__chart">
					<Bar
						data={{
							labels: Object.keys(counts),
							datasets: [
								{
									label: 'Tickets',
									data: Object.values(counts),
									backgroundColor: [
										'rgba(255, 99, 132, 0.2)',

									],
									borderColor: [
										'rgba(255, 99, 132, 1)',
									],
									borderWidth: 1,
								},
							],
						}}
						width={10}
						height={15} />
				</div>
				<div className="main__pie-chart">
					<div className="pie-chart pie-chart__ticket-type">
						<p className="pie-chat__title">Ticket by type</p>
						<Pie
							data={{
								labels: Object.keys(countsType),
								datasets: [{
									data: Object.values(countsType),
									backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'],
									borderColor: [
										'rgba(54, 162, 235, 1)',
										'rgba(255, 206, 86, 1)',
										'rgba(75, 192, 192, 1)',
									],
								}]
							}}
							width={10}
							height={15} />
					</div>
					<div className="pie-chart">
						<p className="pie-chat__title">Ticket by priority</p>
						<Pie
							data={{
								labels: Object.keys(countsPriority),
								datasets: [{
									data: Object.values(countsPriority),
									backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'],
									borderColor: [
										'rgba(54, 162, 235, 1)',
										'rgba(255, 206, 86, 1)',
										'rgba(75, 192, 192, 1)',
									]
								}]
							}}
							width={10}
							height={15} />
					</div>
				</div>
				<div className="main__tickets">
					<h3 className="main__tickets__title">All Tickets</h3>
					<table className="main__tickets--table">
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
								const { _id, title, ticketType, ticketPriority, ticketProjectName, ownerName, ticketDeveloperName } = ticket
								return (
									<tr key={_id}>
										<td className="item-table">{index}</td>
										<td className="item-table tickets__table--name">{title}</td>
										<td className="item-table">{ticketType}</td>
										<td className="item-table">{ticketPriority}</td>
										<td className="item-table">{ticketDeveloperName}</td>
										<td className="item-table">{ticketProjectName}</td>
										<td className="item-table">{ownerName}</td>
										<td className="item-table tickets__table--button"><Link to={`/tickets/update/${_id}`} className="edit-button">Edit</Link></td>
										<td className="item-table tickets__table--button"><button onClick={() => deleteTicket(_id)}className="delete-button">Delete</button></td>
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

export default Dashboard