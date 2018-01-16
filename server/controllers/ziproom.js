const Ziproom = require('../models/Ziproom.js');

const ziproomController = {
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