const models = require('../models');
const express = require('express');
const verifyToken = require('../middleware/verify_token');
const router = express.Router();

router.get('/', (req, res) => {
	models.User
	  .findAll({
		  include: [models.Location],
		  attributes: {exclude: ['password']}
	  })
	  .then(users => res.json(users))
	  .catch(err => res.status(404).send(`Users not found... ${err}`));
});

router.get('/:id', (req, res) => {
	models.User
	  .findOne({
		  where: {id: req.params.id},
		  include: [models.Location],
		  attributes: {exclude: ['password']}
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

module.exports = router;
