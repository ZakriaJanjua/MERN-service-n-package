const router = require('express').Router();
const Services = require('../models/Services');

router.get('/', (req, res, next) => {
	Services.find({})
		.then((items) => {
			res.status(200);
			res.json(items);
		})
		.catch((err) => next(err));
});

router.post('/', (req, res, next) => {
	if (!req.body) {
		res.status(400);
		res.json({
			message: 'Request body is missing',
		});
	} else {
		Services.create(req.body)
			.then((item) => {
				res.status(201);
				res.json(item);
			})
			.catch((err) => next(err));
	}
});

module.exports = router;
