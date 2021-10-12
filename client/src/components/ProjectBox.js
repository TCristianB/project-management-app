import React from 'react'

const ProjectBox = () => {
	return (
		<div className="project-box">
			<div className="project-box__header">
				<p className="project-box__title">Title</p>
				<button>Edit</button>
			</div>
			<p className="project-box__description">A simple description of the project. Something easy to read</p>
		</div>
	)
}

export default ProjectBox