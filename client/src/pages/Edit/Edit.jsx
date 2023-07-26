import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appointmentsEditSlice } from '../../store/reducers/appointmentsEditSlice';
import { getAppointments } from '../../store/reducers/ActionCreators';
import styles from './Edit.module.css';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';

export const Edit = () => {
	const { appointments, editedAppointments, isLoading } = useSelector((state) => state.appointmentsEdit);
	const { setEditedAppointments } = appointmentsEditSlice.actions;
	const dispatch = useDispatch();

	useEffect(() => {
		const intervalId = setInterval(() => {
			dispatch(getAppointments());
		}, 5000);

		dispatch(getAppointments());

		return () => clearInterval(intervalId);
	}, []);

	const onChangeHandler = (e) => {
		const value = e.target.value;
		const id = e.target.id;
		const newAppointments = JSON.parse(JSON.stringify(editedAppointments));

		const currentAppointment = newAppointments.find((item) => item._id == id);
		currentAppointment.date = value;
		currentAppointment.edited = true;

		dispatch(setEditedAppointments(newAppointments));
	}

	let content = <div className={styles.Message}>No appointments found.</div>;

	if (appointments.length > 0) {
		content = (
			<div className={styles.Appointments}>
				<div className={styles.LeftColumn}>
					<div className={styles.AppointmentsList}>
						{appointments.map((item) => (
							<div key={item._id} className={styles.Appointment}>
								{`${item.patientId}, ${item.doctorId}`}
								{item.date ? `, ${item.date}` : ''}
							</div>
						))}
					</div>
				</div>
				<div className={styles.RightColumn}>
					<div className={styles.AppointmentsList}>
						{editedAppointments.map((item) => (
							<div key={item._id} className={styles.Appointment}>
								{`${item.patientId}, ${item.doctorId}, `}
								<input className={styles.DateInput} onChange={onChangeHandler} id={item._id} value={item.date || ''} />
								<button className={styles.ViewCardBtn}>View Card</button>
							</div>
						))}
					</div>
					<div className={styles.AppointmentsAmount}>Two blue appointments. Two green appointments.</div>
					<Button
						className={styles.SaveDataBtn}
						onClick={() => {
							console.log('Save Data');
						}}
					>
						Save Data
					</Button>
				</div>
			</div>
		);
	}

	return <div className={styles.Edit}>{content}</div>;
};

export default Edit;
