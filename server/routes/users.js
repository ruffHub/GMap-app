const
  models = require('../models'),
  express = require('express'),
  verifyToken = require('../middleware/verify_token'),
  router = express.Router();

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
	models.User
	  .update(req.body.data, {where: {id: req.body.id}})
	  .then(user => res.json(user))
	  .catch(err => res.status(404).send('User not found.'));
});

router.delete('/', verifyToken, (req, res) => {
	models.User
	  .destroy({where: {id: req.body.id}})
	  .then(user => res.json(user))
	  .catch(err => res.status(404).send('User not found.'));
});

module.exports = router;
