const Joi = require("joi");
const services = require("../services/twentyfourGameService");

const twentyfourGame = async (req, res) => {
  const schema = Joi.object({
    numberA: Joi.number().integer().min(1).max(9).required(),
    numberB: Joi.number().integer().min(1).max(9).required(),
    numberC: Joi.number().integer().min(1).max(9).required(),
    numberD: Joi.number().integer().min(1).max(9).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).send({ message: error.details[0].message });
  } else {
    const { numberA, numberB, numberC, numberD } = req.body;

    const result = await services.twentyfourLogic(
      24,
      numberA,
      numberB,
      numberC,
      numberD
    );

    const response = {
      answer: result !== false && true,
      ...(result !== false && { result }),
    };

    res.status(200).send({ ...response });
  }
};

const xoGame = {
  wonCondition: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],
  checkWin: (board, player) => {
    let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
    let gameWon = null;

    for (let [index, win] of xoGame.wonCondition.entries()) {
      if (win.every((elem) => plays.indexOf(elem) > -1)) {
        gameWon = { index: index, player: player };
        break;
      }
    }

    return gameWon;
  },
  minimax: (newBoard, player) => {
    const humanPlayer = "x",
      aiPlayer = "o";
    var availSpots = newBoard.filter((s) => typeof s == "number");

    if (xoGame.checkWin(newBoard, humanPlayer)) {
      return { score: -10 };
    } else if (xoGame.checkWin(newBoard, aiPlayer)) {
      return { score: 10 };
    } else if (availSpots.length === 0) {
      return { score: 0 };
    }
    var moves = [];
    for (var i = 0; i < availSpots.length; i++) {
      var move = {};
      move.index = newBoard[availSpots[i]];
      newBoard[availSpots[i]] = player;

      if (player == aiPlayer) {
        var result = xoGame.minimax(newBoard, humanPlayer);
        move.score = result.score;
      } else {
        var result = xoGame.minimax(newBoard, aiPlayer);
        move.score = result.score;
      }

      newBoard[availSpots[i]] = move.index;

      moves.push(move);
    }

    var bestMove;
    if (player === aiPlayer) {
      var bestScore = -10000;
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      var bestScore = 10000;
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    return moves[bestMove];
  },
  bastSpot: async (req, res) => {

    const schema = Joi.object({
      newBoard: Joi.array().required(),
      player: Joi.string().min(1).max(9).required(),
    });

    try {
      const { newBoard, player } = req.body;
      console.log(newBoard);
      console.log(player);
      const bastSpot = xoGame.minimax(newBoard, player);
      res.status(200).send(bastSpot);
    } catch (error) {
      res.status(400).send(bastSpot);
    }

    
  },
};

module.exports = { twentyfourGame, xoGame };
