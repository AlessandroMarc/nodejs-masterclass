var http2 = require('http2')

var server = http2.createServer()

// On a stream we want to send back hello world html
server.on('stream', function(stream, headers) {
    stream.respond({
        'status': 200,
        'content-type': 'text/html'
    })
    stream.end('<html><body><p>Hello World</p></body></html>')
})

server.listen(6000)