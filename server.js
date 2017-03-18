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
  socket.on('nickNameEntered',function(nickName){
    console.log('NickName:' + nickName);
    io.emit('nickNameEntered',nickName);

    socket.on('chatMessage',function(msg){
    var nickWithMessage = [nickName ,':', msg];
    console.log('MESSAGE:' + nickWithMessage);
    io.emit('chatMessage',nickWithMessage);
    });

  });
  
});

http.listen(8080,function(){
	console.log('Server running...');
});