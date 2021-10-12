import React from 'react'
import { Link } from 'react-router-dom'

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
						<input className="main-project__input" type="text" placeholder="Search..." />
						<Link to="/new-project" className="main-project__action--button">Add project</Link>
					</div>
					<div className="main__project-area">
						<ProjectBox />
						<ProjectBox />
						<ProjectBox />
						<ProjectBox />
						<ProjectBox />
						<ProjectBox />
						<ProjectBox />
						<ProjectBox />
					</div>
				</div>
			</main>
		</div>
	)
}

export default Projects