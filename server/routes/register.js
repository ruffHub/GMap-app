const
  express = require('express'),
  jwt = require('jsonwebtoken'),
  router = express.Router(),
  models = require('../models'),
  app = require('../app');

router.post('/', (req, res) => {
	const {name, password} = req.body;
	models.User
	  .findOne({where: {name: name}}).then(user => {
		if (user) {
			return res.status(403).send('User already exists');
		}

		models.User
		  .create(req.body)
		  .then(user => {
			  const name = user.name;
			  res.json({
				  id: user.id,
				  token: jwt.sign({name, password}, req.app.get('superSecret'), {
					  expiresIn: '24h'
				  })
			  });
		  })
		  .catch(err => console.log(err));
	});
});

module.exports = router;