import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { validateUsers, validateAppointments } from '../../helpers/validate';

export const createAppointments = createAsyncThunk('appointments/create', async (_, thunkAPI) => {
	const {
		appointments: { patients, doctors, appointments },
	} = thunkAPI.getState();

	try {
		const response = await axios.post('http://localhost:8889/api/appointments/create', {
			patients: validateUsers(patients),
			doctors: validateUsers(doctors),
			appointments: validateAppointments(appointments),
		});
		return response.data;
	} catch (e) {
		return thunkAPI.rejectWithValue(e.message);
	}
});

export const clearAppointments = createAsyncThunk('appointments/clear', async (_, thunkAPI) => {
	try {
		const response = await axios.delete('http://localhost:8889/api/appointments/clear');
		return response.data;
	} catch (e) {
		return thunkAPI.rejectWithValue(e.message);
	}
});

export const getAppointments = createAsyncThunk('appointmentsEdit/getAll', async (_, thunkAPI) => {
	try {
		const response = await axios.get('http://localhost:8889/api/appointments/getAll');
		return response.data;
	} catch (e) {
		return thunkAPI.rejectWithValue(e.message);
	}
});

export const editAppointments = createAsyncThunk('appointmentsEdit/edit', async (_, thunkAPI) => {
	try {
		const response = await axios.put('http://localhost:8889/api/appointments/edit');
		return response.data;
	} catch (e) {
		return thunkAPI.rejectWithValue(e.message);
	}
});
