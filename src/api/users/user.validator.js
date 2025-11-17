const { check, validationResult } = require('express-validator');

const validatePosition = [
  // --- Reglas de validación ---
  check('positionName')
    .notEmpty().withMessage('The name of the position is required')
    .isString().withMessage('The name of the position must be a string')
    .isLength({ min: 1 }).withMessage('The name of the position must be at least 1 character')
    .isLength({ max: 50 }).withMessage('The name cannot exceed 50 characters'),

  check('status')
    .optional()
    .isBoolean().withMessage('Status must be a boolean'),

  // --- Middleware equivalente al validate de Joi ---
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation Error',
        details: errors.array().map(err => err.msg)
      });
    }

    req.validatedData = req.body; // Igual que con Joi
    next();
  }
];

module.exports = {validatePosition};