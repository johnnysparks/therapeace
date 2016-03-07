var OpenTok = require('opentok');

var API_KEY = '45517012'
var API_SECRET = '8cac3b27e3034d5add84d3bec6479eba3d4b892b'
var opentok = new OpenTok(API_KEY, API_SECRET);
var sessionId;
opentok.createSession({mediaMode:"routed"}, function(error, session) {
  if (error) {
    console.log("Error creating session:", error)
  } else {
    sessionId = session.sessionId;
    console.log("Session ID: " + sessionId);
  }
});
