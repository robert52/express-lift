'use strict';

const DEF_BODY_PARSER_JSON_LIMIT = '10mb';

const express = require('express');
const bodyParser = require('body-parser');
const createCorsMiddleware = require('./middlewares/createCorsMiddleware');
const createAccessLoggerMiddleware = require('./middlewares/createAccessLoggerMiddleware');
const createLoggerStream = require('./createLoggerStream');
const envParser = require('./envParser');

const defaultConfig = {
  ENABLE_ACCESS_LOG: envParser.parse(process.env.ENABLE_ACCESS_LOG) || false,
  ENABLE_CORS: envParser.parse(process.env.ENABLE_CORS) || false,
  TRUST_PROXY: envParser.parse(process.env.TRUST_PROXY) || false,
  DISABLE_POWERED_BY: envParser.parse(process.env.DISABLE_POWERED_BY) || true,
  BODY_PARSER_SIZE_LIMIT: process.env.BODY_PARSER_SIZE_LIMIT || DEF_BODY_PARSER_JSON_LIMIT,
};

module.exports = ({ logger, accessLogger, cors, config = {} }) => {
  const app = express();
  const appConfig = Object.assign({}, defaultConfig, config);
  const {
    ENABLE_ACCESS_LOG,
    ENABLE_CORS,
    TRUST_PROXY,
    DISABLE_POWERED_BY,
    BODY_PARSER_SIZE_LIMIT,
  } = appConfig;

  app.set('config', appConfig);
  app.set('logger', logger);

  // disable `x-powered-by` header by default
  if (DISABLE_POWERED_BY !== false) {
    app.disable('x-powered-by');
  }

  // we should not trust proxies by default
  if (TRUST_PROXY) {
    app.enable('trust proxy');
  }

  if (ENABLE_ACCESS_LOG !== false) {
    const accessLoggerStream = createLoggerStream({ logger });
    const accessLoggerMiddleware = accessLogger || createAccessLoggerMiddleware({
      stream: accessLoggerStream(),
    });
    app.use(accessLoggerMiddleware());
  }

  if (ENABLE_CORS !== false) {
    const corsMiddleware = cors || createCorsMiddleware();
    app.use(corsMiddleware());
  }

  // TODO: body parsing should be optional
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({
    limit: BODY_PARSER_SIZE_LIMIT,
  }));

  return app;
};
