const axios = require('axios');
const bodyParser = require('body-parser');
const request = require('request')
const router = require('express').Router();
const config =require('../config.js');
const controllers = require('./controllers/mainController.js')

router.use(bodyParser.json());

router.post('/search', function(req, res){
  var qs; // qs are the params for request to yelps api 
  if(req.body.location) { //this if statement to check wheter location was given in human readable (zip code etc.) or coordinates
    qs = {term: req.body.term,
      limit: 8,
      location: req.body.location,
      price: req.body.filter,
      radius: 8046,      
      open_now: req.body.openNow,
      sort_by: req.body.sortBy,
    };
  } else {
    qs = {term: req.body.term,
      limit: 8,
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
