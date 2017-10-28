var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var favicon = require('serve-favicon');

app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/assets/favicon.png'));

io.on('connection', function(socket){
  console.log('User connected');
  socket.on('nickNameEntered',function(nickName){
    console.log('NickName:' + nickName);
    io.emit('nickNameEntered',nickName);
    console.log('User ' + nickName + ' connected');
    var newUser = 'User '+ nickName +' connected...';
    var newUserDis = 'New user disconnected...';
    io.emit('chatNewUserJoined',newUser);
  socket.on('disconnect',function(){
    console.log('User disconnected');
    io.emit('chatNewUserDisconnected',newUserDis);
  });
    socket.on('chatMessage',function(msg){
    var nickWithMessage = [nickName+': '+ msg];
    console.log('MESSAGE:' + nickWithMessage);
    io.emit('chatMessage',nickWithMessage);
    });

  });
  
});

http.listen(8080,function(){
	console.log('Server running...');
});