var express = require('express');
var router = express.Router();
const History = require('../models/history');
const GoogleImages = require('google-images')
const client = new GoogleImages(process.env.CSE_ID, process.env.API_KEY)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Image Search Abstraction Layer' });
});

// search images
router.get('/search/:seq', function(req, res) {
  const query = req.params.seq
  const offset = req.query.offset ? req.query.offset : 1
  let imgObj = {}
  let output = []

  // save search query to db
  new History({ term: query }).save()

  client.search(query, {page: offset})
    .then(images => {
      images.forEach(function(img) {
        imgObj.url = img.url
        imgObj.snippet = img.description
        imgObj.thumbnail = img.thumbnail.url
        imgObj.context = img.parentPage

        // push the imgObj
        output.push(imgObj)
        // reset the imgObj for the next img in images
        imgObj = {}
      })
      res.json(output)
    })
}) // end get /search/:seq

router.get('/latest', (req, res) => {
  // return object with term and when, but strip id, set limit and sort
  History.find({}, 'term when -_id').limit(10).sort('-when').then((results) => {
    res.json(results)
  })
}) // end get /latest

module.exports = router;
