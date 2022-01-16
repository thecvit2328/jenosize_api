var express = require("express")
var router = express.Router();
var restaurant = require("../controllers/restaurants")
var twentyfourGame = require("../controllers/games")

router.get('/api/search', restaurant.search);
router.post('/api/game/twentyfour', twentyfourGame);

module.exports = router;