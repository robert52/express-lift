'use strict';

const httpServerRunner = require('./httpServerRunner');

module.exports = ({ logger, server, config }) => () => {
  return httpServerRunner({ logger, server, config });
};
