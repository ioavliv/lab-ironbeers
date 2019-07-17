
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
hbs.registerPartials(__dirname + '/views/partials');


app.get(['/home', "/"], function (req, res) {
  res.render('home')
})

app.get('/beers', function (req, res) {
  punkAPI.getBeers()
  .then(beers => {
    console.log(beers)
    res.render('beers.hbs', {beers})
  })
  .catch(error => {
    console.log(error)
  })
})

app.get('/random-beer', function (req, res) {
  punkAPI.getRandom()
  .then(beer => {
    console.log(beer)
    res.render('random-beer.hbs', {beer: beer[0]})
  })
  .catch(error => {
    console.log(error)
  })
  
})


app.listen(3000);
