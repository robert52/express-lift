'use strict';

const cors = require('cors');

module.exports = ({ config } = {
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200,
  methods: [
    'GET',
    'HEAD',
    'PUT',
    'PATCH',
    'POST',
    'OPTIONS',
    'DELETE'
  ],
  allowedHeaders: [
    'Content-Type',
    'Accept',
    'X-Requested-With',
    'Authorization'
  ]
}) => () => cors(config);
