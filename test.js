var cp = require('child_process')
  , spawn = cp.spawn
  , server  = spawn('./node_modules/serve/bin/serve', ['.'])
  , phantom = spawn('./vendor/phantomjs', ['./phantom.js'])


phantom.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
})

phantom.on('exit', function (code, signal) {
  var outcome = code == 0 ? 'passed' : 'failed'
  console.log('Qwery tests have %s', outcome, code)
  server.kill('SIGHUP')
  process.exit(code)
})
