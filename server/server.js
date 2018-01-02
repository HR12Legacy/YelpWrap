const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const config = require('../webpack-config.js');
const webpackMiddleware = require('webpack-dev-middleware');
const path = require('path');
const router = require('../src/router.js')
const app = express();

app.set('PORT', 1337);

app.use(bodyParser.json());

const compiler = webpack(config);

app.use(express.static(path.join(__dirname, '../public')))

app.use(webpackMiddleware(compiler, {
	hot: true,
	filename: 'bundle.js',
	publicPath: '/',
	stats: {
		colors: true,
	},
	historyApiFallback: true,
}));


app.use('/', router)

app.listen(app.get('PORT'), () => {
  console.log('App listening on port:', app.get('PORT'));
})
