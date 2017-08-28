var express = require('express');
var router = express.Router();
const GoogleImages = require('google-images')
const client = new GoogleImages(process.env.CSE_ID, process.env.API_KEY)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Image Search Abstraction Layer' });
});

// search images
router.get('/:seq', function(req, res) {
  const query = req.params.seq

  client.search(query)
    .then(images => {
      res.json(images)
    })
})

module.exports = router;
