import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './TextArea.module.css';

const TextArea = (props) => {
	const { title, id, value, onChange } = props;
	const dispatch = useDispatch();

	const onChangeHandler = (e) => {
		dispatch(onChange({ type: id, value: e.target.value}));
	};

	return (
		<div className={styles.FormGroup}>
			<label htmlFor={id}>{title}</label>
			<textarea id={id} className={styles.TextArea} value={value} onChange={onChangeHandler}></textarea>
		</div>
	);
};

export default TextArea;
