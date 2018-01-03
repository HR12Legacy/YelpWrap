const axios = require('axios');
const bodyParser = require('body-parser');
const request = require('request')
const router = require('express').Router();
const config =require('../config.js');

router.use(bodyParser.json());

router.post('/search', function(req, res){
  // console.log(typeof(req.body.term), req.body.location)
  const options = {
    url: 'https://api.yelp.com/v3/businesses/search?',
    headers: {'Authorization': `Bearer ${config.TOKEN}` },
    qs: {term: req.body.term,
        location: req.body.location}
  }; 

  request(options, (err, response, body) => {
    // console.log("Data from Yelp: ", body)
    var results = JSON.parse(body);
    res.send(results.businesses)
  })


})

// router.get('/')


module.exports = router;

// let options = {
//     url: 'https://api.yelp.com/v3/businesses/search?location=' + data.location + data.category + 
//     '&limit=10' +'&radius=' + data.radius,
//     headers: {
//       'User-Agent': 'request',
//       'Authorization': `Bearer ${config.TOKEN}`
//     },
//     // token: config.TOKEN,
    

//   };