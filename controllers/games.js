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

module.exports = twentyfourGame;
