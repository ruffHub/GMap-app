const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
	const token = req.body.token || req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, req.app.get('superSecret'), function (err, decoded) {
			if (err) {
				console.error('JWT Verification Error', err);
				return res.status(403).send(err);
			} else {
				req.decoded = decoded;
				return next();
			}
		});
	} else {
		res.redirect('/api/v1/auth');
	}
}

module.exports = verifyToken;