var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

import Game from './server/Game';

app.use('/build',express.static(__dirname + '/build'));
// app.use('/css',express.static(__dirname + '/css'));
// app.use('/js',express.static(__dirname + '/js'));
app.use('/assets',express.static(__dirname + '/assets'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

server.listen(8080, function(){ // Listens to port 8081
    console.log('Listening on '+server.address().port);
});

var game = new Game(io);
game.start();
