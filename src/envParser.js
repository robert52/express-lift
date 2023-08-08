'use strict';

module.exports.parse = (value) => {
  if (value === 'null' || value === null) {
    return null;
  }

  if (value === 'undefined' || value === undefined) {
    return undefined;
  }

  // Number
  if (!isNaN(value)) {
    return Number(value);
  }

  // Boolean
  if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
    return value === 'true';
  }

  // Array
  if (value.indexOf(',') !== -1) {
    return value.split(',').map(parseKey);
  }

  return value;
};

module.exports.parseBoolean = (value) => {
  if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
    return value === 'true';
  }

  throw new Error('Boolean environment variable required.');
};
