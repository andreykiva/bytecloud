import React from 'react';
import styles from './Create.module.css';
import Button from '../../components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { appointmentsSlice } from '../../store/reducers/appointmentsSlice';
import TextArea from '../../components/TextArea/TextArea';
import { clearAppointments, createAppointments } from '../../store/reducers/ActionCreators';
import ResultsModal from './ResultsModal/ResultsModal';

export const Create = () => {
	const { patients, doctors, appointments, isModalOpen } = useSelector((state) => state.appointments);
	const { changeValue } = appointmentsSlice.actions;
	const dispatch = useDispatch();

	const onClickSend = (e) => {
		e.preventDefault();
		if (patients || doctors || appointments) {
			dispatch(createAppointments());
		}
	};

	const onClickClear = (e) => {
		e.preventDefault();
		dispatch(clearAppointments());
	};

	return (
		<div className={styles.Create}>
			{ isModalOpen ? <ResultsModal /> : '' }
			<form className={styles.CreateForm}>
				<div className={styles.FormContent}>
					<TextArea title="Patients" id="patients" value={patients} onChange={changeValue} />
					<TextArea title="Doctors" id="doctors" value={doctors} onChange={changeValue} />
					<TextArea title="Appointments" id="appointments" value={appointments} onChange={changeValue} />
				</div>
				<div className={styles.FormButtons}>
					<Button className={styles.FormBtn} onClick={onClickSend}>
						Send Data
					</Button>
					<Button className={styles.FormBtn} appearance="red" onClick={onClickClear}>
						Clear DB
					</Button>
				</div>
			</form>
		</div>
	);
};

export default Create;
