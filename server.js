var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
	var parsedUrl = url.parse(request.url);
	if(parsedUrl.pathname == '/listings'){
		response.end(JSON.stringify(listingData));
	}
	else{
		response.statusCode = 404;
		response.end('Bad gateway error');
	}
};

fs.readFile('listings.json', 'utf8', function(err, data) {
	listingData = JSON.parse(data);
	server = http.createServer(requestHandler);
	server.listen(port);
});
