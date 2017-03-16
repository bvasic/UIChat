$(function () {
  var socket = io();
  $('form').submit(function(){
    socket.emit('chatMessage', $('#m').val());
    return false;
  });
  socket.on('chatMessage', function(msg){
    $('#messages').append($('<li>').text(msg).fadeIn());
  });
  socket.on('chatNewUserJoined', function(newUser){
    $('#chatDetails').append($('<li>').text(newUser).fadeIn());
  });
  socket.on('chatNewUserDisconnected', function(newUserDis){
    $('#chatDetails').append($('<li>').text(newUserDis).fadeIn());
  });
  
});