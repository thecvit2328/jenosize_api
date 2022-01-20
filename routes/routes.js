var express = require("express");
var router = express.Router();
var restaurant = require("../controllers/restaurants");
var { twentyfourGame, xoGame } = require("../controllers/games");

router.get("/api/search", restaurant.search);
router.post("/api/game/twentyfour", twentyfourGame);
router.post("/api/game/xo", xoGame.bastSpot);

module.exports = router;
