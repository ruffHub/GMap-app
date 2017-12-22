const models = require('../models');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/:id', (req, res) => {
  models.Location
    .findAll({where: {UserId: req.params.id}})
    .then(location => res.json(location))
    .catch(err => res.status(404).send('Locations not found.'));
});

router.post('/', verifyToken, (req, res) => {
  models.Location
    .create({UserId: req.body.userId})
    .then(location => { location.updateAttributes(req.body.data).then(res.status(200).send('Success!')) })
    .catch(err => res.status(404).send('Locations not found.'));
});

router.put('/', verifyToken, (req, res) => {
  models.Location
    .update(req.body.data, {where: {id: req.body.id}})
    .then(user => res.json(user))
    .catch(err => res.status(404).send('User not found.'));
});

router.delete('/', verifyToken,(req, res) => {
  models.Location
    .destroy({ where: {id: req.body.id} })
    .then(user => res.json(`Delete ${user}`))
    .catch(err => res.status(404).send('User not found.'));
});

function verifyToken (req, res, next) {
	const token = req.body.token || req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, req.app.get('superSecret'), function(err, decoded) {
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
