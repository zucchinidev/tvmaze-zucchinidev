```js
const tvMaze = require('tv-maze')
const tvMazeClient = tvMaze.createClient()

tvMazeClient.shows().then((response) => {
    // .....
})

tvMazeClient.search().then((response) => {
    // .....
})
```