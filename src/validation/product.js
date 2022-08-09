const Joi = require("joi");

const variantSchema = Joi.object().keys({
  sku: Joi.string().required(),
  specification: Joi.string().required(),
  price: Joi.number().required(),
});

const schema = Joi.object().keys({
  reference: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  variants: Joi.array().items(variantSchema),
});

const validateProduct = (body) => {
  return schema.validate(body);
};

module.exports = validateProduct;
