const http = require('http');
const fs = require('fs').promises;


const host = 'localhost';
const port = 8000;

const requestListener = function (request, response) {
  console.dir('Request params '+request.param);

  if (request.method == 'POST') {
    console.log('POST');
    var body = '';

    //  listening to the stream data events

    request.on('data', function (data) {
      body += data;
      console.log('Partial body: ' + body);
    });

    // stream end
    request.on('end', function () {
      console.log('Body: ' + body);
      response.writeHead(200, { 'Content-Type': 'text/html' });
	 
      response.end('post received '+ body);
    });

  } else if (request.method == 'GET') {
    switch (request.url) {
      case '/file':
        fs.readFile(__dirname + '/index.html').then((contents) => {
          response.setHeader('Content-Type', 'text/html');
          response.writeHead(200);
          response.end(contents);
        });

		
        break;
		default:
            response.writeHead(404);
            response.end(JSON.stringify({error:"Resource not found"}));
    }
  }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
