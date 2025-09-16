export const validateQuery = (shema) => async (req, res, next) => {
  const validationQuery = await shema.validateAsync(req.query, {
    abortEarly: false,
    allowUnknown: false,
    convert: true,
  });
  req.validatedQuery = validationQuery;
  next();
};
