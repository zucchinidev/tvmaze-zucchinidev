import { test } from 'babel-tap'
import * as tvmaze from '../index'
import { Client } from '../lib/client'

test('should create a client', (t) => {
  t.ok(tvmaze.createClient, 'should exist')
  t.equal(typeof tvmaze.createClient, 'function', 'should be a function')
  const client = tvmaze.createClient()
  t.ok(client instanceof Client, 'should be instance of client')
  t.end()
})

test('should list shows', (t) => {
  const client = tvmaze.createClient()
  t.equal(typeof client.shows, 'function', 'should be a function')
  t.end()
})
