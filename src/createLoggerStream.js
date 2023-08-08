'use strict';

module.exports = ({ logger }) => () => ({
  write: function(message, encoding) {
    logger.info(message);
  }
});
