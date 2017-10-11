const http = require('http')

const maxEvent = process.env['MAX_EVENT'] || 5
const eventHistory = []
let historyPos = 0

function handleEvent (req, res) {
  let body = []
  req.on('data', (chunk) => {
    body.push(chunk)
  }).on('end', () => {
    body = Buffer.concat(body).toString()
    try {
      eventHistory[historyPos] = JSON.parse(body)
      historyPos = (historyPos + 1) % maxEvent
      res.statusCode = 200
      res.statusMessage = 'ok'
      res.end()
    } catch (error) {
      res.statusCode = 400
      res.statusMessage = 'Bad Request'
      res.end()
    }
  })
}

function displayHistory (req, res) {
  const jsonHistory = []
  for (let i = 0; i < maxEvent; i++) {
    const pos = (historyPos + i) % maxEvent
    const reqevent = eventHistory[pos]
    if (reqevent) {
      jsonHistory.push(reqevent)
    }
  }
  res.statusCode = 200
  res.statusMessage = 'ok'
  res.end(JSON.stringify(jsonHistory, null, 2), {'Content-Type': 'application/json'})
}

const server = http.createServer((req, res) => {
  if (req.url === `/event`) {
    handleEvent(req, res)
  } else if (req.url === `/history`) {
    displayHistory(req, res)
  } else {
    res.statusCode = 404
    res.statusMessage = 'Not found'
    res.end()
  }
})

server.listen(parseInt(process.env['PORT'] || '8080'))
