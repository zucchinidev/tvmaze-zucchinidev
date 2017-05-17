import { test } from 'babel-tap'
import * as tvmaze from '../index'
import { Client } from '../lib/client'
import nock from 'nock'
const endpoint = 'http://api.tvmaze.test'

test('should create a client', (t) => {
  t.ok(tvmaze.createClient, 'should exist')
  t.equal(typeof tvmaze.createClient, 'function', 'should be a function')
  const client = tvmaze.createClient()
  t.ok(client instanceof Client, 'should be instance of client')
  t.end()
})

test('should list shows', (t) => {
  const client = tvmaze.createClient({
    endpoint
  })
  t.equal(typeof client.shows, 'function', 'should be a function')

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
