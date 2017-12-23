const
  models = require('../models'),
  express = require('express'),
  router = express.Router();

router.get('/', (req, res) => {
	models.User
	  .findAll({include: [models.Location]})
	  .then((users = []) => res.json(users))
	  .catch(err => console.log(err));
});

module.exports = router;
