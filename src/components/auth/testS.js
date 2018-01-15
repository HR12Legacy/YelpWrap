const express = require('express');
const bodyParser = require('body-parser');
const db = require('mongoose');

const app = express();
app.set('PORT', 1337)

mongoose.connect('mongodb://localhost/db');

const Name = mongoose.model('Name', {name: String});

app.post('/', (req, res) => {
	const name = new Name({name: req.body.name});
	name.save((err)=>{if(err) console.log(err)});
})




app.listen(app.get('PORT'), () => {
	console.log('hello')
})
