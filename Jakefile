require('shelljs/global');


//
// Jake Tasks
//   Run "jake" from the command line to get started
//
task("default", infoTask)

desc("This is an introduction to therapace development")
task("info", infoTask)

desc("Prepare the system for development deployment")
task("setup", setupTask)

function setupTask() {
  startWebServer()
  startServices()
}

function startWebServer() {
  echo("Starting webserver on port: 3000")
  exec('(cd ./web/ && DEBUG=express:* npm start)')
}

function startServices() {
  echo("Starting video services on: ")
}

function infoTask() {
   echo(cat('README.md'))
}
