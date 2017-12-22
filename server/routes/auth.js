const express = require('express');
const jwt = require('jsonwebtoken');
const bCrypt = require('bcrypt');
const router = express.Router();
const models = require('../models');
const app = require('../app');

router.post('/', (req, res) => {
    const {name, password} = req.body;
    models.User
        .findOne({where: {name: name}})
        .then(userFromDb => {
                if (!userFromDb) {
                    res.status(404).json({message: 'Username not found!'});
                } else {
                    const hash = userFromDb.password;
                    const id = userFromDb.id;
                    bCrypt.compare(password, hash).then(isMatch => {
                        if (isMatch) {
                            res.json({
                                success: true,
                                id: id,
                                token: jwt.sign({id, name, password}, req.app.get('superSecret'), {
                                    expiresIn: '24h'
                                })
                            });
                        } else {
                            res.status(404).json({message: 'Login failed!'});
                        }
                    });
                }
            }
        ).catch(error => {
        res.status(500).json({message: 'There was an error!'});
    });
});

module.exports = router;
