'use strict';

const dotenv = require('dotenv');
const defaultConfig = {
  NODE_ENV: 'development',
};

module.exports = () => {
  dotenv.config();

  return Object.assign({}, defaultConfig, process.env);
};
