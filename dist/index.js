'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tvmaze = undefined;

var _client = require('./client');

var createClient = function createClient(options) {
  return new _client.Client(options);
};
var tvmaze = exports.tvmaze = {
  createClient: createClient
};
//# sourceMappingURL=index.js.map