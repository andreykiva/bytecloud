import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './assets/reset.css';
import './index.css';
import { App } from './App';
import { setupStore } from './store/store';

const store = setupStore();

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
);
