import requestPromise from 'client-request/promise'
import qs from 'querystring'

export class Client {
  constructor ({endpoint} = {endpoint: 'http://api.tvmaze.com'}) {
    this.endpoint = endpoint
  }

  shows () {
    return this.request('shows', 'GET')
  }

  show (id) {
    return this.request(`shows/${id}`, 'GET')
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

  search (showName, {single} = {single: false}) {
    let request
    switch (single) {
      case false:
        request = this.request('search/shows', 'GET', {q: showName})
        break
      default:
        request = this.request('singlesearch/shows', 'GET', {q: showName})
    }
    return request
  }

  getPage (page = 0) {
    return this.request('shows', 'GET', {page})
  }
}
