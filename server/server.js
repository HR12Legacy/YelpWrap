const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const config = require('../webpack-config.js');
const webpackMiddleware = require('webpack-dev-middleware');
const path = require('path');
const router = require('./router.js');
const db = require('./config').db;
const app = express();
const http = require('http').Server(app);
const io = module.exports.io = require('socket.io')(http);
const socketManager = require('./socketManager.js')

app.set('PORT', process.env.PORT || 1338);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const compiler = webpack(config);

app.use(express.static(path.join(__dirname, '../public')))

// app.use(webpackMiddleware(compiler, {
// 	hot: true,
// 	filename: 'bundle.js',
// 	publicPath: '/',
// 	stats: {
// 		colors: true,
// 	},
// 	historyApiFallback: true,
// }));

io.on('connection', socketManager.connect);


app.use('/', router)

http.listen(app.get('PORT'), () => {
  console.log('App listening on port:', app.get('PORT'));
})
