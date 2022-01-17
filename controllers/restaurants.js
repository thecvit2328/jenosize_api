const Joi = require("joi");
const services = require("../services/findPlaceSevice");

const search = async (req, res) => {
  const schema = Joi.object({
    search: Joi.string().min(2).required(),
  });

  const { error } = schema.validate({ search: req.query.search });

  if (error) res.status(400).send({ message: error.details[0].message });

  try {
    const findPlace = await services.findPlaceByGGM(req.query.search);
    res.status(200).send(JSON.parse(findPlace));
  } catch (error) {
    console.log(error);
    const { status, data } = error?.response;
    res.status(status).send(data);
  }
};

module.exports = { search };
