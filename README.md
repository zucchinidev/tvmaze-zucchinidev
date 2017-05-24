# tvmaze-zucchinidev

A ES2015 TVMaze Client for Node.js

## Install

```
$ npm install tvmaze-zucchinidev --save
```
## Usage
```js
import { tvmaze } from 'tvmaze-zucchinidev'
const client = tvmaze.createClient()


test('should list shows', (t) => {
  client
    .shows()
    .then((response) => {
      t.ok(Array.isArray(response.body), 'should be an array')
      t.end()
    })
})

test('should retrieve a show by id', (t) => {
  client
    .show(id)
    .then(({body}) => {
      t.ok(body, 'should be an object')
      t.end()
    })
})

test('should search shows', (t) => {
  const name = 'limitless'
  client
    .search(name)
    .then(({body}) => {
      t.ok(Array.isArray(body), 'should be an array')
      t.equals(body[0].name, 'limitless', 'should retrieve a show name')
      t.end()
    })
})

test('should search a single show', (t) => {
  const q = 'girls'
  client
    .search(q, {sigle: true})
    .then(({body}) => {
      t.ok(body, 'should be an object')
      t.equals(body.name, 'Girls', 'should retrieve a show name')
      t.end()
    })
})
test('should retrieve a page', (t) => {
  client
    .getPage(0)
    .then(({body}) => {
      t.ok(body, 'should be an object')
      t.equals(typeof body, 'object', 'should be an object')
      t.ok(Array.isArray(body), 'object', 'should be an array')
      t.end()
    })
})

test('should create any query', (t) => {
  client
    .request('people/1', 'GET')
    .then(({body}) => {
      t.ok(body, 'should be an object')
      t.end()
    })
})

test('should create any query', (t) => {
  const embed = 'show' // params
  client
    .request('people/1/castcredits', 'GET', {embed})
    .then(({body}) => {
      t.ok(body, 'should be an object')
      t.end()
    })
})

```


## License MIT

Copyright (c) 2017 - Andrea Zucchini


Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:


The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.


THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.