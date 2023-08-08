'use strict';

const DEF_PORT = 3000;
const DEF_HOSTNAME = 'localhost';
const DEF_ENV = 'development';

const envParser = require('./envParser');

const defaultConfig = {
  PORT: envParser.parse(process.env.PORT) || DEF_PORT,
  HOSTNAME: process.env.HOSTNAME || DEF_HOSTNAME,
  NODE_ENV: process.env.NODE_ENV || DEF_ENV,
  APP_NAME: process.env.APP_NAME,
};

module.exports = ({ logger, server, config = {} }) => {
  const {
    PORT,
    HOSTNAME,
    APP_NAME,
    NODE_ENV
  } = Object.assign({}, defaultConfig, config);

  server.listen(PORT, HOSTNAME, () => {
    const details = server.address();

    logger.info('Server is running', {
      appName: APP_NAME,
      hostname: details.address,
      port: details.port,
      environment: NODE_ENV,
    });
  });

  return server;
};
