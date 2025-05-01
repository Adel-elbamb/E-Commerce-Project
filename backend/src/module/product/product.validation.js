import Joi from "joi";

const objectIdValidator = (value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error('any.invalid');
    }
    return value;
  };
  
export const createProductSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(5).required(),
    price: Joi.number().positive().required(),
    images: Joi.array().items(Joi.string().uri()).min(1).required(), // assuming URLs
    seller: Joi.string().custom(objectIdValidator).required(),
    category: Joi.string().custom(objectIdValidator).required(),
    stock: Joi.number().integer().min(0).required(),
  });
  
  export const updateProductSchema = Joi.object({
    name: Joi.string().min(3).max(100),
    description: Joi.string().min(5),
    price: Joi.number().positive(),
    images: Joi.array().items(Joi.string().uri()),
    seller: Joi.string().custom(objectIdValidator),
    category: Joi.string().custom(objectIdValidator),
    stock: Joi.number().integer().min(0),
    productId: Joi.string().custom(objectIdValidator).required(),
  }).min(1); // at least one field required
  
  export const deleteIdSchema = Joi.object({
    productId: Joi.string().custom(objectIdValidator).required(),
  });