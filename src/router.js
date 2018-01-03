const axios = require('axios');
const bodyParser = require('body-parser');
const request = require('request')
const router = require('express').Router();
const config =require('../config.js');
const controllers = require('./controllers/mainController.js')

router.use(bodyParser.json());

// router.post('/search', function(req, res){
//   const options = {
//     url: 'https://api.yelp.com/v3/businesses/search?',
//     headers: {'Authorization': `Bearer ${config.Yelp_TOKEN}` },
//     qs: {term: req.body.term,
//         location: req.body.location}
//   }; 

//   request(options, (err, response, body) => {
//     var results = JSON.parse(body);
//     res.send(results.businesses)
//   })
// })



router.post('/search', function(req, res){
  const options = {
    url: 'https://api.yelp.com/v3/businesses/search?',
    headers: {'Authorization': `Bearer ${config.Yelp_TOKEN}` },
    qs: {term: req.body.term,
        latitude: req.body.coords.latitude,
        longtitude: req.body.coords.longtitude}
  }; 
  console.log('in side router post ',req.body)
  request(options, (err, response, body) => {
    var results = JSON.parse(body);
    res.send(results.businesses)
  })
})

router.post('/user', (req, res) => {
  controllers.user.add(req.body, () => {
    res.status(200).send();
  })
})

router.post('/favorite', (req, res) => {
  controllers.favorite.add(req.body, () => {
    res.status(200).send();
  })
})

module.exports = router;
