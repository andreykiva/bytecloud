import { createSlice } from '@reduxjs/toolkit';
import { getAppointments, editAppointments } from './ActionCreators';

const initialState = {
	appointments: [],
	editedAppointments: [],
	isLoading: false,
	isModalOpen: false,
	error: '',
};

export const appointmentsEditSlice = createSlice({
	name: 'appointmentsEdit',
	initialState,
	reducers: {
		closeModal(state) {
			state.isModalOpen = false;
		},
		setEditedAppointments(state, action) {
			state.editedAppointments = action.payload;
		},
	},
	extraReducers: {
		[getAppointments.fulfilled.type]: (state, action) => {
			state.isLoading = false;
			state.error = '';
			state.appointments = action.payload;

			const newAppointments = JSON.parse(JSON.stringify(action.payload));
			const edited = state.editedAppointments.filter((item) => item.edited);

			edited.forEach((item) => {
				let index = newAppointments.findIndex((appointment) => appointment._id === item._id);

				if (index !== -1) {
					newAppointments[index] = { ...item };
				}
			});

			state.editedAppointments = newAppointments;
		},
		[getAppointments.pending.type]: (state) => {
			state.isLoading = true;
		},
		[getAppointments.rejected.type]: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		[editAppointments.fulfilled.type]: (state, action) => {
			state.isLoading = false;
			state.error = '';
			state.appointments = action.payload;
		},
		[editAppointments.pending.type]: (state) => {
			state.isLoading = true;
		},
		[editAppointments.rejected.type]: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export default appointmentsEditSlice.reducer;
