import { test } from 'babel-tap'
import * as tvmaze from '../index'
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
