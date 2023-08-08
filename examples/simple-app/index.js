'use strict';

const expressLift = require('../../index');
const container = expressLift();
const { runHttpServer } = container;

// start http server
runHttpServer();
