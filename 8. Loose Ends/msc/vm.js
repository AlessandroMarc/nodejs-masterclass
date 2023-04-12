var vm = require('vm')

// Define a context for the script
var context = {
    'foo': 25
}

// Define the script that execute
var script = new vm.Script(`

foo= foo * 2
var bar = foo + 1

`)

script.runInContext(context)
console.log(context)