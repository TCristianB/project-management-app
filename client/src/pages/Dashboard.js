import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Bar, Pie } from 'react-chartjs-2'

import '../styles/Dashboard.css'

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
	const [tickets, setTickets] = useState([])
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
		"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
	];

	useEffect(() => {
		axios.get('/api/tickets')
			.then(res => {
				setTickets(res.data)

			})

	}, [])

	const counts = { "12 oct": 4 }
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
		return counts
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
							{tickets.length > 0 && tickets.map((ticket, index )=> {
								const {_id, title, ticketType, ticketPriority} = ticket
								return (
									<tr key={_id}>
										<td>{index}</td>
										<td className="tickets__table--name">{title}</td>
										<td>{ticketType}</td>
										<td>{ticketPriority}</td>
										<td>John</td>
										<td>Project 1</td>
										<td>Mark</td>
										<td className="tickets__table--button">Click</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
			</main>
		</div>
	)
}

export default Dashboard