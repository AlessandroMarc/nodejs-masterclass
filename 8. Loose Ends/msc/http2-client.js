var http2 = require('http2')

var client = http2.connect('http://localgost:6000')

var req = client.request({
    ':path': '/'
})

// When a message is received, add pieces of it together unitl you reach the end
var str = ''
req.on('data', function(chunck) {
    str += chunck
})

req.on('end', function() {
    console.log(str)
})

req.end()