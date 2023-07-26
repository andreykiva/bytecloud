import React from 'react';
import styles from './Button.module.css';

const Button = ({ className, appearance = 'green', children, onClick }) => {
	return <button className={[styles.Button, className, styles[appearance]].join(' ')} onClick={onClick}>{children}</button>;
};

export default Button;
