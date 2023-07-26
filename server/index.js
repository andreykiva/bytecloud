const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const appointmentRouter = require('./routes/appointmentRouter');
const { mongoURI } = require('./config');

const PORT = process.env.PORT || 8889;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api/appointments', appointmentRouter);

const start = () => {
	try {
		mongoose.connect(mongoURI, {
			useUnifiedTopology: true,
			useNewUrlParser: true
		});

		const connection = mongoose.connection;

		connection.once('open', function () {
			console.log('MongoDB database connection established successfully');
		});

		app.listen(PORT, () => {
			console.log(`server started on port ${PORT}`);
		});
	} catch (e) {
		console.log(e);
	}
};

start();
