const axios = require('axios');
const bodyParser = require('body-parser');
const request = require('request')
const router = require('express').Router();
const config =require('../config.js');
const controllers = require('../server/controllers/mainController.js');
const util = require('./util.js');

// router.use(bodyParser.json());



router.post('/search', function(req, res){
  controllers.search.request(req.body, result => {
    res.status(200).send(result);
  })
})

router.post('/login', (req, res) => {
	util.validateLogin(req, res)
})

router.post('/user', (req, res) => {
  controllers.user.add(req.body, (user) => {
    res.status(200).send(user);
  })
})

router.post('/favorite', (req, res) => {
  controllers.favorite.add(req.body, () => {
    res.status(200).send();
  })
})

module.exports = router;
