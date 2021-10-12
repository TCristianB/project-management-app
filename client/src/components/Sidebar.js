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
					class={`fas fa-bars bars-icon ${menuButton.iconOpen ? '' : 'icon-open'}`}
				></i>
				<div className="sidebar__title">
					<Link to='/dashboard' className="header__title--link">Project Management <br />App</Link>
				</div>
				<ul className="sidebar__list">
					<li className="sidebar__list--item selected">
						<i class="fas fa-desktop sidebar-icons"></i>
						<Link to='/dashboard' className="list__item--text"> Dashboard</Link>
					</li>
					<li className="sidebar__list--item">
					<i class="fas fa-box sidebar-icons"></i>
						<Link to='/projects' className="list__item--text">Projects</Link>
					</li>
					<li className="sidebar__list--item">
					<i class="fas fa-ticket-alt sidebar-icons"></i>
						<Link to='/tickets' className="list__item--text">Tickets</Link>
					</li>
					<li className="sidebar__list--item">
					<i class="far fa-plus-square sidebar-icons"></i>
						<Link to='/new-ticket' className="list__item--text">Create ticket</Link>
					</li>
				</ul>
			</div>
		</>
	)
}

export default Sidebar