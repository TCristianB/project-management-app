import React from 'react'
import { Bar, Pie } from 'react-chartjs-2'

import '../styles/Dashboard.css'

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const tickets = [["13 ene", 2], ["15 ene", 4], ["17 ene", 3]]

const Dashboard = () => {
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
							labels: tickets.map(ticket => ticket[0]),

							datasets: [{
								label: 'tickets',
								data: tickets.map(ticket => ticket[1]),
								backgroundColor: ['rgba(11,175,96,255)']
							}]
						}}
						width={10}
						height={15} />
				</div>
				<div className="main__pie-chart">
					<div className="pie-chart pie-chart__ticket-type">
						<p className="pie-chat__title">Ticket by type</p>
						<Pie
							data={{
								labels: ['backend', "frontend", "UI"],
								datasets: [{
									data: [12, 13, 14],
									backgroundColor: ['red', 'blue', 'yellow']
								}]
							}}
							width={10}
							height={15} />
					</div>
					<div className="pie-chart">
						<p className="pie-chat__title">Ticket by priority</p>
						<Pie
							data={{
								labels: ['low', "medium", "high"],
								datasets: [{
									data: [12, 13, 14],
									backgroundColor: ['rgba(11,175,96,255)', 'rgba(254,215,1,255)', 'red']
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

export default Dashboard