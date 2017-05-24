'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Client = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _promise = require('client-request/promise');

var _promise2 = _interopRequireDefault(_promise);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = exports.Client = function () {
  function Client() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { endpoint: 'http://api.tvmaze.com' },
        endpoint = _ref.endpoint;

    _classCallCheck(this, Client);

    this.endpoint = endpoint;
  }

  _createClass(Client, [{
    key: 'shows',
    value: function shows() {
      return this.request('shows', 'GET');
    }
  }, {
    key: 'show',
    value: function show(id) {
      return this.request('shows/' + id, 'GET');
    }
  }, {
    key: 'request',
    value: function request(path, method, params) {
      var uri = this.endpoint + '/' + path;
      if (params) {
        uri = uri + '?' + _querystring2.default.encode(params);
      }
      return (0, _promise2.default)({
        uri: uri,
        method: method,
        json: true
      });
    }
  }, {
    key: 'search',
    value: function search(showName) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { single: false },
          single = _ref2.single;

      var request = void 0;
      switch (single) {
        case false:
          request = this.request('search/shows', 'GET', { q: showName });
          break;
        default:
          request = this.request('singlesearch/shows', 'GET', { q: showName });
      }
      return request;
    }
  }, {
    key: 'getPage',
    value: function getPage() {
      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      return this.request('shows', 'GET', { page: page });
    }
  }]);

  return Client;
}();
//# sourceMappingURL=client.js.map