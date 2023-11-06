import Joi from "joi";

export const validateQuickestPathBody = (body: {
  products: string[];
  startingPosition: { x: number; y: number; z: number };
}) => {
  const quickestPathSchema = Joi.object({
    products: Joi.array().items(Joi.string()).required(),
    startingPosition: {
      x: Joi.number().required(),
      y: Joi.number().required(),
      z: Joi.number().required(),
    },
  });

  return quickestPathSchema.validate(body);
};
