const axios = require('axios');
const bodyParser = require('body-parser');
const request = require('request')
const router = require('express').Router();
const config =require('../config.js');
const controllers = require('../server/controllers/mainController.js');
const util = require('./util.js');
const User = require('./models/User')
// router.use(bodyParser.json());



// router.post('/search', function(req, res){
//   console.log('search router')
//   controllers.search.request(req.body, result => {
//     res.status(200).send(result);
//   })
// })



router.post('/search', function(req, res){
  var qs; // qs are the params for request to yelps api 
  if(req.body.location) { //this if statement to check wheter location was given in human readable (zip code etc.) or coordinates
    qs = {term: req.body.term,
      limit: 4,
      location: req.body.location,
      price: req.body.filter,
      radius: 8046,      
      open_now: req.body.openNow,
      sort_by: req.body.sortBy,
    };
  } else {
    qs = {term: req.body.term,
      limit: 4,
      radius: 8046,
      latitude: req.body.lat,
      longitude: req.body.lng,
      price: req.body.filter,
      open_now: req.body.openNow,
      sort_by: req.body.sortBy,
    };
  }

  const options = {
    url: 'https://api.yelp.com/v3/businesses/search?',
    headers: {'Authorization': `Bearer ${config.Yelp_TOKEN}` },
    qs: qs
  }; 

  request(options, (err, response, body) => {
    const datas = JSON.parse(body);
    console.log(datas)
    if(req.body.delivery) {
      datas.businesses = datas.businesses.reduce((acc, curr) => {
        curr.transactions.indexOf('delivery') !== -1 ? acc.push(curr) : acc;
        return acc;
      }, []);
    }
    res.send(datas); 
  });   
});


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

router.post('/message', (req, res) => {
  controllers.message.addMessage(req.body, messagedAdded => {
    if (messagedAdded) {
      res.json(true);
    } else {
      res.json(false);
    }
  })
})

module.exports = router;