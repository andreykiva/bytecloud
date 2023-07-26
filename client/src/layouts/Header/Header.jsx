import React from 'react';
import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = () => {
	return (
		<header className={styles.Header}>
			<nav>
				<NavLink
					to="/"
					className={(isActive) => styles.NavLink + (isActive.isActive ? ` ${styles.ActiveLink}` : '')}
				>
					Create
				</NavLink>
				<NavLink
					to="/edit"
					className={(isActive) => styles.NavLink + (isActive.isActive ? ` ${styles.ActiveLink}` : '')}
				>
					Edit
				</NavLink>
			</nav>
		</header>
	);
};

export default Header;
