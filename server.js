var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
  console.log('User connected');
  var newUser = 'New user connected...';
  var newUserDis = 'New user disconnected...';
  io.emit('chatNewUserJoined',newUser);
  socket.on('disconnect',function(){
  	console.log('User disconnected');
  	io.emit('chatNewUserDisconnected',newUserDis);
  });
  socket.on('chatMessage',function(msg){
  	console.log('MESSAGE:' + msg);
  	io.emit('chatMessage',msg);
  	
  });
});

http.listen(8080,function(){
	console.log('Server running...');
});