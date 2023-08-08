'use strict';

const httpServer = require('./src/httpServer');
const ConsoleLogger = require('./src/ConsoleLogger');
const loadConfig = require('./src/loadConfig');
const serverShutdownHandler = require('./src/serverShutdownHandler');
const createApp = require('./src/createApp');
const createHttpServerRunner = require('./src/createHttpServerRunner');

module.exports = ({
  logger,
  config,
  accessLogger,
  cors,
  onSignal,
  onHealthCheck,
  onShutdown,
  forceKillTimeout,
} = {}) => {
  logger = logger || new ConsoleLogger();
  config = config || loadConfig();
  const app = createApp({
    logger,
    accessLogger,
    cors,
    config,
  });
  const server = serverShutdownHandler({
    logger,
    server: httpServer({ app }),
    onSignal,
    onHealthCheck,
    onShutdown,
    forceKillTimeout,
  });
  const runHttpServer = createHttpServerRunner({ logger, server, config });

  return {
    logger,
    app,
    config,
    server,
    runHttpServer,
  };
};
