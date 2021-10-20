import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import '../styles/Projects.css'

import ProjectBox from '../components/ProjectBox'

const Projects = () => {
	const [projects, setProjects] = useState([])
	const [searchTerm, setSearchTerm] = useState('')

	const isAuthenticated = window.localStorage.getItem('isAuthenticated')

	useEffect(() => {
		axios.get('/api/projects')
			.then(res => {
				setProjects(res.data.projects)
			})
	}, [])

	if (!isAuthenticated) {
		return <Redirect to="/login" />
	}

	return (
		<main className="main">
			<div className="main-projects__nav">
				<h2>All Projects</h2>
				<div className="main-project__action">
					<input className="main-project__input" type="text" placeholder="Search..." onChange={(event) => setSearchTerm(event.target.value)} />
					<Link to="/new-project" className="main-project__action--button">Add project</Link>
				</div>
				<div className="main__project-area">
					{projects && projects.filter((val) => {
						if (searchTerm === "") {
							return val
						} else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
							return val
						} else {
							return null
						}

					}).map(project => {
						const { _id, title, decription, developers, owner } = project
						return <ProjectBox key={_id} id={_id} owner={owner} title={title} description={decription} developers={developers.length} />
					})}
				</div>
			</div>
		</main>
	)
}

export default Projects