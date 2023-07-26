import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appointmentsSlice } from '../../../store/reducers/appointmentsSlice';
import { format } from '../../../helpers/format';
import styles from './ResultsModal.module.css';
import Loader from '../../../components/Loader/Loader';

const ResultsModal = () => {
	const { postResults, clearResults, isLoading } = useSelector((state) => state.appointments);
	const { closeModal } = appointmentsSlice.actions;
	const dispatch = useDispatch();

	const closeModalHandler = () => {
		dispatch(closeModal());
	};

	let content = '';

	console.log(postResults);

	if (postResults) {
		content = (
			<div className={styles.PostResults}>
				{format(postResults).map((group) => (
					<div className={styles.ResultsGroup} key={group.title}>
						<div className={styles.GroupTitle}>{group.title}</div>
						<div className={styles.GroupItems}>
							{group.items.map((item, i) => (
								<div key={i} className={styles.GroupItem}>
									{Object.values(item).join(', ')}
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		);
	} else if (clearResults) {
		content = (
			<div className={styles.ClearResults}>
				<div className={styles.DeletedItem}>Patients deleted: {clearResults.patients}</div>
				<div className={styles.DeletedItem}>Doctors deleted: {clearResults.doctors}</div>
				<div className={styles.DeletedItem}>Appointments deleted: {clearResults.appointments}</div>
			</div>
		);
	}

	return (
		<div className={styles.ResultsModal}>
			{isLoading ? (
				<Loader />
			) : (
				<div className={styles.ModalInner}>
					<button className={styles.CloseModalBtn} onClick={closeModalHandler}>
						✖
					</button>
					<div className={styles.ModalContent}>{content}</div>
				</div>
			)}
		</div>
	);
};

export default ResultsModal;
