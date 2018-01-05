const axios = require('axios');
const bodyParser = require('body-parser');
const request = require('request')
const router = require('express').Router();
const config =require('../config.js');
const controllers = require('../server/controllers/mainController.js');
const util = require('./util.js');
const User = require('./models/User')

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
  console.log('login')
  const validationResult = util.validateSignupForm(req.body);
  if (!validationResult.success) {
    console.log('hello123')
    return res.status(400).send({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  } else {
    new User({username: req.body.username})
    .fetch()
    .then(user => {
      user.comparePassword(req.body.password, (match) => {
        if(match) {
          console.log('match')
          return res.status(200).json({
              success:true,
              redirectUrl: '/'
          })
        } else {
          console.log('hello')
          return res.status(400).send({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
          })
        }
      })
    })
  }

});

module.exports = router;