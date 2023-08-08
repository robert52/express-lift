'use strict';

function log() {
  console.log.apply(console, arguments);
}

class ConsoleLogger {
  constructor() {
    this.log = log;
    this.debug = log;
    this.error = log;
    this.info = log;
    this.warning = log;
  }
}

module.exports = ConsoleLogger;
