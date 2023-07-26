import { combineReducers, configureStore } from '@reduxjs/toolkit';
import appointmentsReducer from './reducers/appointmentsSlice';
import appointmentsEditReducer from './reducers/appointmentsEditSlice';

const rootReducer = combineReducers({
	appointments: appointmentsReducer,
	appointmentsEdit: appointmentsEditReducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	});
};
