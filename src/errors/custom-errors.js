'use strict';
const DB_CONSTANT = require('../../config/dbConstants');

module.exports = function CustomError(message,status) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.status = status;
  this.errorType = "Custom"
};

require('util').inherits(module.exports, Error);
