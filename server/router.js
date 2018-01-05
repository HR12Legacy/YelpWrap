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

router.get('/favorite/:userId', (req, res) => {
  console.log(req.params)
  controllers.favorite.retrieve(req.params, (result) => {
    res.status(200).send(result);
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
  } else {
    new User({email: req.body.email})
    .fetch()
    .then(user => {
      user.comparePassword(req.body.password, (match) => {
        console.log(user)
        if(match) {
          return res.status(200).json({
              success:true,
              redirectUrl: '/',
              userId: user.id
          })
        } else {
          // validationResult.message = 'Check form for errors';
          // validationResult.errors = 'Invalid combinations';
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