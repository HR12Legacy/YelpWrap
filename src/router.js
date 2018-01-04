const axios = require('axios');
const bodyParser = require('body-parser');
const request = require('request')
const router = require('express').Router();
const config =require('../config.js');

router.use(bodyParser.json());

router.post('/search', function(req, res){
  console.log(req.body.term, req.body.location)
  const options = {
    url: 'https://api.yelp.com/v3/businesses/search?',
    headers: {'Authorization': `Bearer ${config.Yelp_TOKEN}` },
    qs: {term: req.body.term,
        location: req.body.location}
  }; 

  request(options, (err, response, body) => {
    var results = JSON.parse(body);
    res.send(results.businesses)
  })


})

module.exports = router;

