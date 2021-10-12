import React from 'react'

import '../styles/CreateProject.css'

import Header from '../components/Header'
import SideBar from '../components/Sidebar'

const CreateProject = () =>{ 
	return(
		<div className="create-project">
			<nav className="nav">
				<Header />
			</nav>
			<SideBar />
			<main className="main main_form">
				<h2>Create a new Project</h2>
				<form>
					<div className="main__form-section">
						<label for="project-title">Title</label><br />
						<input id="project-title" type="text"></input>
					</div>
					<div className="main__form-section">
						<label for="project-description">Description</label><br />
						<input id="project-description" type="text"/>
					</div>
					<button className="main__form--button" type="submit">Create project</button>
				</form>
			</main>
		</div>
	)
}

export default CreateProject