'use strict';

module.exports = (logger) => (fn) => (...args) => fn(logger, ...args);
