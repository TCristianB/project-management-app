import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
	return (
		<div className='sidebar'>
			<ul className="sidebar__list">
				<li>
					<Link>Dashboard</Link>
				</li>
				<li>
					<Link>Projects</Link>
				</li>
				<li>
					<Link>Tickets</Link>
				</li>
				<li>
					<Link>Create ticket</Link>
				</li>
			</ul>
		</div>
	)
}

export default Sidebar