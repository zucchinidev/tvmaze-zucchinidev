import requestPromise from 'client-request/promise'
import qs from 'querystring'

export class Client {
  constructor ({endpoint} = {endpoint: 'http://api.tvmaze.com'}) {
    this.endpoint = endpoint
  }

  shows () {
    return this.request('shows', 'GET')
  }

  request (path, method, params) {
    let uri = `${this.endpoint}/${path}`
    if (params) {
      uri = `${uri}?${qs.encode(params)}`
    }
    return requestPromise({
      uri: uri,
      method: method,
      json: true
    })
  }
}
