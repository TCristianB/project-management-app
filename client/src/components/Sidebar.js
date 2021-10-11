import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/Sidebar.css'

const Sidebar = () => {
	return (
		<>
			<div className='sidebar open'>
				<i class="fas fa-bars icon-open "></i>
				<div className="sidebar__title">
					<Link to='/dashboard' className="header__title--link">Project Management <br />App</Link>
				</div>
				<ul className="sidebar__list">
					<li className="sidebar__list--item selected">
						<Link className="list__item--text">Dashboard</Link>
					</li>
					<li className="sidebar__list--item">
						<Link className="list__item--text">Projects</Link>
					</li>
					<li className="sidebar__list--item">
						<Link className="list__item--text">Tickets</Link>
					</li>
					<li className="sidebar__list--item">
						<Link className="list__item--text">Create ticket</Link>
					</li>
				</ul>
			</div>
		</>
	)
}

export default Sidebar