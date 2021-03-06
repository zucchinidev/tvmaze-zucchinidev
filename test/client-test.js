import { test } from 'babel-tap'
import { tvmaze } from '../lib/index'
import { Client } from '../lib/client'
import nock from 'nock'
const endpoint = 'http://api.tvmaze.test'

test('should create a client', (t) => {
  t.ok(tvmaze.createClient, 'should exist')
  t.equals(typeof tvmaze.createClient, 'function', 'should be a function')
  const client = tvmaze.createClient()
  t.ok(client instanceof Client, 'should be instance of client')
  t.end()
})

test('should list shows', (t) => {
  const client = tvmaze.createClient({
    endpoint
  })
  t.equals(typeof client.shows, 'function', 'should be a function')

  nock(endpoint)
    .get('/shows')
    .reply(200, [])

  client
    .shows()
    .then((response) => {
      t.ok(Array.isArray(response.body), 'should be an array')
      t.end()
    })
})

test('should search shows', (t) => {
  const client = tvmaze.createClient({
    endpoint
  })
  t.equals(typeof client.search, 'function', 'should be a function')

  const name = 'limitless'
  nock(endpoint)
    .get('/search/shows')
    .query({q: name})
    .reply(200, [{name}])

  client
    .search(name)
    .then(({body}) => {
      t.ok(Array.isArray(body), 'should be an array')
      t.equals(body[0].name, 'limitless', 'should retrieve a show name')
      t.end()
    })
})

test('should fail with unknown endpoint', (t) => {
  const client = tvmaze.createClient({
    endpoint
  })

  nock(endpoint)
    .get('/foo')
    .reply(404)

  client
    .request('foo', 'GET')
    .then(() => {})
    .catch((err) => {
      t.ok(err, 'should fail')
      t.end()
    })
})

test('should create any query', (t) => {
  const client = tvmaze.createClient({
    endpoint
  })

  nock(endpoint)
    .get('/people/1')
    .reply(200, {
      "id": 1,
      "url": "http://www.tvmaze.com/people/1/mike-vogel",
      "name": "Mike Vogel",
      "image": {
        "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/0/1815.jpg",
        "original": "http://static.tvmaze.com/uploads/images/original_untouched/0/1815.jpg"
      },
      "_links": {
        "self": {
          "href": "http://api.tvmaze.com/people/1"
        }
      }
    })

  client
    .request('people/1', 'GET')
    .then(({body}) => {
      t.ok(body, 'should be an object')
      t.end()
    })
})

test('should create any query', (t) => {
  const client = tvmaze.createClient({
    endpoint
  })

  nock(endpoint)
    .get('/people/1/castcredits?embed=show')
    .reply(200, {})

  const embed = 'show'
  client
    .request('people/1/castcredits', 'GET', {embed})
    .then(({body}) => {
      t.ok(body, 'should be an object')
      t.end()
    })
})


test('should fail if not query is passed', (t) => {
  const client = tvmaze.createClient({
    endpoint
  })

  nock(endpoint)
    .get('/search/shows')
    .reply(400, {
      code: 0,
      message: 'Missing required parameter: q',
      name: 'Bad request',
      statusCode: 400
    })

  client
    .search()
    .then(() => {})
    .catch((err) => {
      t.ok(err, 'should fail')
      t.notOk(err.body, 'should be null')
      t.end()
    })
})

test('should search a single show', (t) => {
  const client = tvmaze.createClient({
    endpoint
  })
  t.equals(typeof client.search, 'function', 'should be a function')

  const response = {
    'id': 139,
    'url': 'http://www.tvmaze.com/shows/139/girls',
    'name': 'Girls',
    'language': 'English'
  }
  const q = 'girls'
  nock(endpoint)
    .get('/singlesearch/shows')
    .query({q})
    .reply(200, response)

  client
    .search(q, {sigle: true})
    .then(({body}) => {
      t.ok(body, 'should be an object')
      t.equals(body.name, 'Girls', 'should retrieve a show name')
      t.end()
    })
})

test('should retrieve a show by id', (t) => {
  const client = tvmaze.createClient({
    endpoint
  })

  const response = {
    'id': 139,
    'url': 'http://www.tvmaze.com/shows/139/girls',
    'name': 'Girls',
    'language': 'English'
  }
  const id = 139
  nock(endpoint)
    .get(`/shows/${id}`)
    .reply(200, response)

  client
    .show(id)
    .then(({body}) => {
      t.ok(body, 'should be an object')
      t.equals(body.name, 'Girls', 'should retrieve a show name')
      t.end()
    })
})

test('should retrieve a page', (t) => {
  const client = tvmaze.createClient({
    endpoint
  })

  const response = [{
    'id': 1,
    'url': 'http://www.tvmaze.com/shows/1/girls',
    'name': 'Girls',
    'language': 'English'
  }, {
    'id': 2,
    'url': 'http://www.tvmaze.com/shows/2/girls',
    'name': 'Girls',
    'language': 'English'
  }]
  const page = 0
  nock(endpoint)
    .get(`/shows?page=${page}`)
    .reply(200, response)

  client
    .getPage(0)
    .then(({body}) => {
      t.ok(body, 'should be an object')
      t.equals(typeof body, 'object', 'should be an object')
      t.ok(Array.isArray(body), 'object', 'should be an array')
      t.end()
    })
})
