import { createSlice } from '@reduxjs/toolkit';
import { createAppointments, clearAppointments } from './ActionCreators';

const initialState = {
	patients: '',
	doctors: '',
	appointments: '',
	isLoading: false,
	isModalOpen: false,
	error: '',
	postResults: '',
	clearResults: ''
};

export const appointmentsSlice = createSlice({
	name: 'appointments',
	initialState,
	reducers: {
		changeValue(state, action) {
			state[action.payload.type] = action.payload.value;
		},
		closeModal(state) {
			state.isModalOpen = false;
			state.postResults = '';
			state.clearResults = '';
		}
	},
	extraReducers: {
		[createAppointments.fulfilled.type]: (state, action) => {
			state.isLoading = false;
			state.error = "";
			state.postResults = action.payload;
			state.patients = '';
			state.doctors = '';
			state.appointments = '';
		},
		[createAppointments.pending.type]: (state) => {
			state.isLoading = true;
			state.isModalOpen = true;
		},
		[createAppointments.rejected.type]: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		[clearAppointments.fulfilled.type]: (state, action) => {
			state.isLoading = false;
			state.error = "";
			state.clearResults = action.payload;
			state.isModalOpen = true;
		},
		[clearAppointments.pending.type]: (state) => {
			state.isLoading = true;
			state.isModalOpen = true;
		},
		[clearAppointments.rejected.type]: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	}
});

export default appointmentsSlice.reducer;
