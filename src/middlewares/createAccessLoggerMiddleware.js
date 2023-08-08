'use strict';

const morgan = require('morgan');

module.exports = ({ stream }) => () => morgan('combined', { stream });
