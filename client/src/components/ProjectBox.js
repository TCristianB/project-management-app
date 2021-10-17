import React from 'react'
import { Link } from 'react-router-dom'

const ProjectBox = ({ id, owner, title, description, developers }) => {
	let checkOwner = true
	const userId = window.localStorage.getItem('UserId')

	if(owner !== userId) {
		checkOwner = false
	}

	return (
		<div className="project-box">
			<div className="project-box__header">
				<div>
					<p className="project-box__title">{title}</p>
					<p>There are {developers} users on this project</p>
				</div>
				<div className="project-box__buttons">
					{checkOwner && <Link to={`/projects/update/${id}`} className="project-box__button">Edit</Link>}
					<Link to={`/projects/${id}`} className="project-box__button">View</Link>
				</div>
			</div>
			<p className="project-box__description">{description}</p>
		</div>
	)
}

export default ProjectBox