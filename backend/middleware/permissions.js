const { ForbiddenError } = require('@casl/ability');
const { defineAbilitiesFor } = require('../shared_module/abilities');

module.exports = function checkPermissions(action, subject) {
  return (req, res, next) => {
    const ability = defineAbilitiesFor(req.user);
    try {
      ForbiddenError.from(ability).throwUnlessCan(action, subject);
      next();
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  };
};