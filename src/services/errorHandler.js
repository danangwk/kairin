const logger = require('./logger');

function handleError(context, error) {

  logger.error(context, {
    message: error.message,
    stack: error.stack
  });

}

module.exports = {
  handleError
};