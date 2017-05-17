import requestPromise from 'client-request/promise'
export class Client {
  constructor ({endpoint} = {endpoint: 'http://api.tvmaze.com'}) {
    this.endpoint = endpoint
  }

  shows () {
    return requestPromise({
      uri: `${this.endpoint}/shows`,
      method: 'GET',
      json: true
    })
  }
}
