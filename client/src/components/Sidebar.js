import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import '../styles/Sidebar.css'

const Sidebar = () => {
	const [menuButton, setMenuButton] = useState({
		iconOpen: false,
		sideBar: true
	})

	const openMenu = (value1, value2) => {
		setMenuButton({
			iconOpen: value1,
			sideBar: value2
		})
	}
	
	return (
		<>
			<div className={`sidebar ${menuButton.sideBar ? '' : 'open'}`}>
				<i 
				onClick={() => openMenu(!menuButton.iconOpen, !menuButton.sideBar)} 
				class={`fas fa-bars ${menuButton.iconOpen ? '' : 'icon-open'}`}
				></i>
				<div className="sidebar__title">
					<Link to='/dashboard' className="header__title--link">Project Management <br />App</Link>
				</div>
				<ul className="sidebar__list">
					<li className="sidebar__list--item selected">
						<Link to='/dashboard' className="list__item--text">Dashboard</Link>
					</li>
					<li className="sidebar__list--item">
						<Link to='/projects' className="list__item--text">Projects</Link>
					</li>
					<li className="sidebar__list--item">
						<Link to='/tickets' className="list__item--text">Tickets</Link>
					</li>
					<li className="sidebar__list--item">
						<Link to='/new-ticket' className="list__item--text">Create ticket</Link>
					</li>
				</ul>
			</div>
		</>
	)
}

export default Sidebar