const
  models = require('../models'),
  express = require('express'),
  verifyToken = require('../middleware/verify_token'),
  router = express.Router();

router.get('/:id', (req, res) => {
	models.Location
	  .findAll({where: {UserId: req.params.id}})
	  .then(location => res.json(location))
	  .catch(err => res.status(404).send('Locations not found.'));
});

router.post('/', verifyToken, (req, res) => {
	models.Location
	  .create({UserId: req.body.userId})
	  .then(location => {
		  location.updateAttributes(req.body.data).then(res.status(200).send('Success!'));
	  })
	  .catch(err => res.status(404).send('Locations not found.'));
});

router.put('/', verifyToken, (req, res) => {
	models.Location
	  .update(req.body.data, {where: {id: req.body.id}})
	  .then(location => res.json(location))
	  .catch(err => res.status(404).send('Location not found.'));
});

router.delete('/', verifyToken, (req, res) => {
	models.Location
	  .destroy({where: {id: req.body.id}})
	  .then(location => res.status(200).send(`Success! Deleted ${location}`))
	  .catch(err => res.status(404).send('Location not found.'));
});

module.exports = router;
