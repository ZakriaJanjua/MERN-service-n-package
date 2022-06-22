const express = require('express');
const volleyball = require('volleyball');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const service = require('./routes/service');
const package = require('./routes/package');

const app = express();

app.use(volleyball);
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(cors());

mongoose.connect(
	`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.ti7ms.mongodb.net/mern-snp?retryWrites=true&w=majority`,
	() => console.log('connected to mongo')
);

app.get('/', (req, res, next) => {
	res.send('API Works!!!');
});
app.use('/service', service);
app.use('/package', package);

function notFound(req, res, next) {
	res.status(404);
	const error = new Error('Not Found - ' + req.originalUrl);
	next(error);
}

function errorHandler(err, req, res, next) {
	res.status(res.statusCode || 500);
	res.json({
		message: err.message,
		stack: err.stack,
	});
}

app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => console.log('listening on port 5000'));
