// await schema.parseAsync(req, res) is the line where you use zod to validate the request body data against the defined schema

const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    return next();
  } catch (err) {
    const status = 422;
    const message = "Fill the input properly";
    const extraDetails = err.issues.map((curElem) => curElem.message);

    const error = {
      status,
      message,
      extraDetails,
    };

    next(error);
  }
};

module.exports = validate;
