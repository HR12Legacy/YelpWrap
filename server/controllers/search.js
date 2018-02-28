const request = require('request')
require('dotenv').load();

module.exports = {
  request: (body, cb) => {
    var qs; // qs are the params for request to yelps api 
    if(body.location) { //this if statement to check wheter location was given in human readable (zip code etc.) or coordinates
      qs = {
        term: body.term,
        location: body.location
      };
    } else {
      qs = {
        term: body.term,
        latitude: body.lat,
        longitude: body.lng
      };
    }

    const options = {
      url: 'https://api.yelp.com/v3/businesses/search?',
      headers: {'Authorization': `Bearer ${process.env.Yelp_TOKEN}` },
      qs: qs
    }; 

    request(options, (err, response, body) => {
      var results = JSON.parse(body);
      cb(results.businesses)
    })
  },

  getReviews: (id, cb) => {
    const options = {
      url: 'https://api.yelp.com/v3/businesses/' + id  + '/reviews',
      headers: {'Authorization': `Bearer ${process.env.Yelp_TOKEN}` }
    }; 

    request(options, (err, response, body) => {
      var results = JSON.parse(body);
      cb(results.reviews)
    })
  }
}