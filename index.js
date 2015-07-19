var http = require('http');
var fs = require('fs');
var url = require('tiny-url');

var route = new url.Router();

route.get('/[ac]/wat', function(req, res) {
    res.write('this is a loop');
    res.end();
});

route.get('/(e|3)/wat', function(req, res) {
    res.write('this is a enum');
    res.end();
})

route.get('/test/wat', function(req, res) {
    res.write('wat');
    res.end();
});

route.get('/', function(req, res) {
    var stream = fs.createReadStream(__dirname + '/html/index.html');
    stream.pipe(res);
});

route.page404 = function(req, res) {
    res.write('I have overridden the page.');
    res.end();
}

var server = http.createServer(function(req, res) {
    route.apply(req, res);
});

server.listen(8000);
