const axios = require('axios');
const bodyParser = require('body-parser');
const request = require('request')
const router = require('express').Router();
const config =require('../config.js');
const controllers = require('../server/controllers/mainController.js');
const util = require('./util.js');

router.post('/search', function(req, res){
  controllers.search.request(req.body, result => {
    res.status(200).send(result);
  })
})


router.post('/favorite', (req, res) => {
  controllers.favorite.add(req.body, () => {
    res.status(200).send();
  })
})

router.post('/user', (req, res) => {
  const validationResult = util.validateSignupForm(req.body);
  if (!validationResult.success) {
    console.log(validationResult)
    return res.status(400).send({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }
  controllers.user.add(req.body, console.log)
  return res.status(200).json({
      success:true,
      redirectUrl: '/'
  })
});

router.post('/login', (req, res) => {
  const validationResult = util.validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).send({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }
  return res.status(200).json({
      success:true,
      redirectUrl: '/'
  })
});

module.exports = router;