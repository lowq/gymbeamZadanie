import Joi from "joi";

/**
 * Validating body of POST request
 * @param body
 * @returns
 */
export const validateQuickestPathBody = (body: {
  products: string[];
  startingPosition: { x: number; y: number; z: number };
}) => {
  const quickestPathSchema = Joi.object({
    products: Joi.array()
      .items(Joi.string().regex(/^product-(?=\d+$)/))
      .required(),
    startingPosition: Joi.object({
      x: Joi.number().required(),
      y: Joi.number().required(),
      z: Joi.number().required(),
    }).required(),
  });

  return quickestPathSchema.validate(body);
};
