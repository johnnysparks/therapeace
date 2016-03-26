<html>
  <head></head>
  <body>
    <div id='myPublisherDiv'></div>
    <div id='subscribersDiv'></div>
    <script src='//static.opentok.com/v2/js/opentok.min.js'></script>
    <script>
      var apiKey = '45517012';
      var sessionId = '1_MX40NTUxNzAxMn5-MTQ1Njk5OTU0MTUzMH5KdWpZYTRPQXMwNnF0dXlwSFpNRzFEOHh-UH4';
      var token = 'T1==cGFydG5lcl9pZD00NTUxNzAxMiZzaWc9ZGJkNTkxZmVmNzRkZDQ1NjZiODQwOTBiNmUzNWRhNWYxMjNmYmRhNTpyb2xlPXB1Ymxpc2hlciZzZXNzaW9uX2lkPTFfTVg0ME5UVXhOekF4TW41LU1UUTFOams1T1RVME1UVXpNSDVLZFdwWllUUlBRWE13Tm5GMGRYbHdTRnBOUnpGRU9IaC1VSDQmY3JlYXRlX3RpbWU9MTQ1NzMzMTUwNiZub25jZT0wLjcyNjcxMjQ4NDk0ODY5NDImZXhwaXJlX3RpbWU9MTQ1NzQxNzkwNg==';
      var session = OT.initSession(apiKey, sessionId);
      session.on({
          streamCreated: function(event) {
            session.subscribe(event.stream, 'subscribersDiv', {insertMode: 'append'});
          }
      });
      session.connect(token, function(error) {
        if (error) {
          console.log(error.message);
        } else {
          session.publish('myPublisherDiv', {width: 320, height: 240});
        }
      });
    </script>
  </body>
</html>
