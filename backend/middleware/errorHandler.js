const logger = require('../utils/logger');

function errorHandler(err, req, res, next) {
  logger.error(`${req.method} ${req.originalUrl} - ${err.message}`);

  const status = err.status || 500;
  res.status(status).json({
    message: status === 500 ? 'Internal server error' : err.message
  });
}

module.exports = errorHandler;