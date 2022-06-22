const router = require('express').Router();
const Packages = require('../models/Packages');
const multer = require('multer');

const Storage = multer.diskStorage({
	destination: 'uploads',
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});
const upload = multer({
	storage: Storage,
}).single('image');

router.get('/', (req, res, next) => {
	Packages.find({})
		.populate('services')
		.exec((err, items) => {
			if (err) return next(err);
			return res.status(200).json(items);
		});
});

router.post('/', (req, res, next) => {
	if (!req.body) {
		res.status(400);
		res.json({
			message: 'No data provided',
		});
	} else {
		upload(req, res, (err) => {
			if (err) {
				res.status(500);
				res.json({
					message: err.message,
				});
			} else {
				console.log(req.body)
				const newItem = new Packages({
					name: req.body.name,
					description: req.body.description,
					image: req.file.filename,
					services: JSON.parse(req.body.services),
				});
				newItem
					.save()
					.then((item) => {
						res.status(201).json(item);
					})
					.catch((err) => next(err));
			}
		});
	}
});

module.exports = router;
