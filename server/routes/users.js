// import {User} from '../../client/src/app/users/user.service';

const models = require('../models');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/', (req, res) => {
	models.User
		.findAll({
			include: [models.Location],
			attributes: { exclude: ['password'] }
		})
		.then(users => res.json(users))
		.catch(err => res.status(404).send(`Users not found... ${err}`));
});

router.get('/:id', (req, res) => {
	models.User
		.findOne({
				where: {id: req.params.id},
				include: [models.Location],
				attributes: { exclude: ['password'] }
		})
	.then(user => res.json(user))
		.catch(err => res.status(404).send('User not found.'));
});

router.put('/', verifyToken, (req, res) => {
	const id = req.decoded.id;

	models.User
		.update(req.body.data, {where: {id: id}})
		.then(user => res.json(user))
		.catch(err => res.status(404).send('User not found.'));
});

router.delete('/:id', verifyToken, (req, res) => {
	models.User
		.destroy({where: {id: req.params.id}})
		.then(user => res.json(user))
		.catch(err => res.status(404).send('User not found.'));
});

function verifyToken(req, res, next) {
	const token = req.body.token || req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, req.app.get('superSecret'), function (err, decoded) {
			if (err) {
				console.error('JWT Verification Error', err);
				return res.status(403).send(err);
			} else {
				req.decoded = decoded;
				// res.json({
				// decoded: decoded
				// });
				return next();
			}
		});
	} else {
		res.redirect('/api/v1/auth');
	}
}

module.exports = router;
