const Ziproom = require('../models/Ziproom.js');
const knex = require('../../server/config.js').knex;

const ziproomController = {
  doesZiproomExist: (zipcode, cb) => {
    Ziproom.where({'zipcode': zipcode})
           .fetch()
           .then(model => {
              if (model) {
                cb(true, model)
              } else {
                cb(false)
              }
           })
           .catch(error => {
              console.log('error checking if room exists: ', error)
              cb(false, undefined, error)
           })
  },
  addZiproom: function(ziproom, cb) {
    this.doesZiproomExist(ziproom.zipcode, (exists, model, error) => {
      if (exists) {
        cb(true, model, undefined)
      } else if (error === undefined && ziproom.zipcode){
        let instance = new Ziproom({
          zipcode: ziproom.zipcode,
          user_count: 0,
          top_restaurant: ''
        }).save()
          .then(model => {
            console.log('room added');
            cb(true, model, undefined);
          })
          .catch(error => {
            console.log('error adding room: ', error);
            cb(false, undefined, error)
          })
      } else {
        cb(false, undefined, error)
      }
    })
  }, 
  retrieve: (cb) => {
    knex.select('*').from('ziproom')
      .then((result) => {
        cb(result);
      })
  }
}

module.exports = ziproomController;