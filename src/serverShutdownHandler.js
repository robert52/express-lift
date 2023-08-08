'use strict';

const SIGINT = 'SIGINT';
const DEF_SIGNAL = SIGINT;

const { createTerminus } = require('@godaddy/terminus');
const createDefaultOnEventHandler = require('./createDefaultOnEventHandler');
const defaultConfig = {
  HEALTHCHECK_PATH: process.env.HEALTHCHECK_PATH || '/healthcheck',
  SHUTDOWN_SIGNAL: process.env.SHUTDOWN_SIGNAL || DEF_SIGNAL,
};

module.exports = ({ logger, server, signal, onSignal, onHealthCheck, onShutdown, forceKillTimeout }) => {
  const config = Object.assign({}, defaultConfig, { signal });

  createTerminus(server, {
    timeout: forceKillTimeout,
    logger: logger.error,
    signal: config.SHUTDOWN_SIGNAL,
    healthChecks: {
      [config.HEALTHCHECK_PATH]: onHealthCheck || createDefaultOnEventHandler({ logger }),
    },
    onSignal: onSignal || createDefaultOnEventHandler({
      message: 'Server cleaning up.',
      logger,
    }),
    onShutdown: onShutdown || createDefaultOnEventHandler({
      message: 'Server clean up finished, server is shutting down.',
      logger,
    }),
  });

  return server;
};
