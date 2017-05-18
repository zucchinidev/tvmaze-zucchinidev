# tvmaze-zucchinidev

A ES2015 TVMaze Client for Node.js

## Install

```
$ npm install tvmaze-zucchinidev --save
```
## Usage
```js
import { tvmaze } from 'tv-maze-zucchinidev'
const client = tvmaze.createClient()

client.shows().then((response) => {
    // do something with shows
})

client.search(showName).then((response) => {
    // do something with shows
})

client.search(showName, { single: true }).then((response) => {
    // do something with show
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