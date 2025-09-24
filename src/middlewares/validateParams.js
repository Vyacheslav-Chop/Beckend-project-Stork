export const validateParams = (schema) => async (req, res, next) => {
  await schema.validateAsync(req.params, {
    abortEarly: false,
    convert: true,
    allowUnknown: false,
  });
  next();
};
