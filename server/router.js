const axios = require('axios');
const bodyParser = require('body-parser');
const request = require('request')
const router = require('express').Router();
const config =require('../config.js');
const controllers = require('../server/controllers/mainController.js');
const util = require('./util.js');
const User = require('./models/User')
const session = require('express-session')
// router.use(bodyParser.json());

const isLoggedIn = function(req) {
  return req.session ? !!req.session.user : false;
};

const checkUser = function(req, res, next){
  if (!isLoggedIn(req)) {
    res.json(false)
  } else {
    next();
  }
};

const createSession = function(req, res, userObj) {
  return req.session.regenerate(function() {
      req.session.user = userObj;

      res.json(userObj)
    });
};

router.get('/session', checkUser, (req, res) => res.json(req.session.user))


router.get('/reviews/:id', function(req, res){
  controllers.search.getReviews(req.params.id, result => {
    res.status(200).send(result);
  })
})


router.post('/search', function(req, res){
  var qs; // qs are the params for request to yelps api 
  if(req.body.location) { //this if statement to check wheter location was given in human readable (zip code etc.) or coordinates
    qs = {term: req.body.term,
      limit: 40,
      location: req.body.location,
      price: req.body.filter,
      radius: 2092,      
      open_now: req.body.openNow,
      sort_by: req.body.sortBy,
    };
  // } else {
  //   qs = {term: req.body.term,
  //     limit: 4,
  //     radius: 8046,
  //     latitude: req.body.lat,
  //     longitude: req.body.lng,
  //     price: req.body.filter,
  //     open_now: req.body.openNow,
  //     sort_by: req.body.sortBy,
  //   };
  }

  const options = {
    url: 'https://api.yelp.com/v3/businesses/search?',
    headers: {'Authorization': `Bearer ${config.Yelp_TOKEN}` },
    qs: qs
  }; 

  request(options, (err, response, body) => {
    var datas = JSON.parse(body);
    if (datas.businesses) {
      datas.businesses = datas.businesses.filter( bus => bus.location.zip_code === req.body.location)
      datas.businesses.splice(20)
      if(req.body.delivery) {
        datas.businesses = datas.businesses.reduce((acc, curr) => {
          curr.transactions.indexOf('delivery') !== -1 ? acc.push(curr) : acc;
          return acc;
        }, []);
      }
      res.send(datas); 
    }
  });   
});

router.get('/ziproom', function(req, res){
  controllers.ziproom.retrieve((results) =>
    res.json(results.map(result => result.zipcode)))
})

router.post('/favorite', (req, res) => {
  controllers.favorite.add(req.body, () => {
    res.status(200).send();
  })
})

router.get('/favorite/:userId', (req, res) => {
  controllers.favorite.retrieve(req.params, (result) => {
    res.status(200).send(result);
  })
})

router.get('/users/:zipcode', (req, res) => {
  controllers.user.getZipUsers(req.params.zipcode, (results)=> {
    res.send(results)
  })
})

router.get('/user/:id', (req, res) => {
  controllers.user.getUser(req.params.id, (result)=> {
    res.json(result[0]);
  })
})

router.post('/user', (req, res) => {
  const validationResult = util.validateSignupForm(req.body);
  if (!validationResult.success) {
    res.status(200).send({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  } else {
    controllers.user.add(req.body, function(created, user){
      if (created) {
        createSession(req, res, { success:true, redirectUrl: '/', user: user, userId: user.id})
      } else {
        res.status(200).send({success: false})
      }
    }) 
  }
});

router.put('/user', (req, res) => {
  controllers.user.update(req.body, (updatedUser)=> {
    res.status(200).json({
      success:true,
      redirectUrl: '/'
    })
  })
})

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

        if(match) {
           var responseObj = {
              success:true,
              redirectUrl: '/',
              userId: user.id,
              user: user
          }
          createSession(req, res, responseObj)
         
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

// save a new message
router.post('/message', (req, res) => {
  controllers.message.addMessage(req.body, messagedAdded => {
    if (messagedAdded) {
      res.json(true);
    } else {
      res.json(false);
    }
  })
})

// create a new room it it doesn't already exist and returns id
// otherwise return all persisted messages for that room along with id
router.post('/ziproom', (req, res) => {
  controllers.ziproom.addZiproom(req.body, (ziproomExists, room, error) => {
    if (ziproomExists) {
      controllers.message.getMessageByRoom(room.attributes.id, (messages) => {
        res.json({
          messages: messages,
          room: room
        });
      })
    } else {
      console.log(error)
      res.json(false)
    }
  })
})

router.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    res.end();
  });
});



module.exports = router;