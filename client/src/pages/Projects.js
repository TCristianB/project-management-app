import React from 'react'

import '../styles/Projects.css'

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import ProjectBox from '../components/ProjectBox'

const Projects = () => {
	return (
		<div className="projects">
			<nav className="nav">
				<Header />
			</nav>
			<Sidebar />
			<main className="main">
				<div className="main-projects__nav">
					<h2>All Projects</h2>
					<div className="main-project__action">
						<input type="text" />
						<button className="main-project__action--button">Add project</button>
					</div>
					<ProjectBox />
				</div>
			</main>
		</div>
	)
}

export default Projects