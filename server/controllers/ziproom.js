const Ziproom = require('../models/Ziproom.js');

const ziproomController = {
  doesZiproomExist: (zipcode, cb) => {
    Ziproom.where({zipcode: zipcode})
           .fetch()
           .then(model => {
              if (model) {
                cb(true)
              } else {
                cb(true)
              }
           })
           .catch(error => {
              console.log('error checking if room exists: ', error)
              cb(false)
           })
  },
  addZiproom: (ziproom, cb) => {
    let instance = new Ziproom({
      zipcode: ziproom.zipcode,
      user_count: 0,
      top_restaurant: ''
    }).save()
      .then(model => {
        console.log('room added');
        cb(true);
      })
      .catch(error => {
        console.log('error adding room: ', error);
        cb(false)
      })
  }
}

module.exports = ziproomController;