'use strict';

module.exports = ({ logger, message }) => () => {
  if (message) {
    logger.info(message);
  }

  return Promise.resolve();
};
