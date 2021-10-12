import React from 'react'

import '../styles/CreateTicket.css'

import Header from '../components/Header'
import SideBar from '../components/Sidebar'

const CreateTicket = () => {
	return (
		<div className="create-ticket">
			<nav className="nav">
				<Header />
			</nav>
			<SideBar />
			<main className="main main_form">
				<h2>Create a new ticket</h2>
				<form>
					<div className="main__form-section">
						<label for="title">Title</label><br />
						<input id="title" type="text" />
					</div>
					<div className="main__form-section">
						<label for="description">Description</label><br />
						<textarea rows="10" cols="25"></textarea>
					</div>
					<div className="main__form-section">
						<label for="ticket_type">Ticket Type</label><br />
						<select name="ticket-type">
							<option value="ui">UI</option>
							<option value="frontend">Frontend</option>
							<option value="backend">Backend</option>
						</select>
					</div>
					<div className="main__form-section">
						<label for="ticket_priority">Ticket Priority</label><br />
						<select name="ticket-priority">
							<option value="high">High</option>
							<option value="medium">Medium</option>
							<option value="low">Low</option>
						</select>
					</div>
					<div className="main__form-section">
						<label>Assigned developer</label><br />
						<select name="ticket-developer">
							<option value="name1">Name1</option>
							<option value="name2">Name2</option>
							<option value="name2">Name3</option>
						</select>
					</div>
					<button className="main__form--button" type="submit">Create ticket</button>
				</form>
			</main>
		</div>
	)
}

export default CreateTicket