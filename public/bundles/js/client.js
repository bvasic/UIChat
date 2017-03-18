$(function () {
  var socket = io();
  //SENDING MESSAGE
  $('#messagingForm').submit(function(){
    socket.emit('chatMessage', $('#m').val());
    $('#m').val('');
    return false;
  });
  //ENTERING NICKNAME
  $('#enterNickname').submit(function(){
    var nickName = $('#nickName').val();
    socket.emit('nickNameEntered', nickName);
    $(".popup").hide();
    $('#m').focus();
    return false;
  });
  //TAKING NICKNAME INTO DOM
  socket.on('nickNameEntered', function(data){
    $('#messages').append($('<li>').text(data+":").fadeIn());
  });
  //APPENDING ENTERED MESSAGE INTO UNORDERED LIST
  socket.on('chatMessage', function(msg){
    $('#messages').append($('<li>').text(msg).fadeIn());
  });
  //SHOWING MESSAGE THAT NEW USER HAS JOINED
  socket.on('chatNewUserJoined', function(newUser){
    $('#chatDetails').append($('<li>').text(newUser).fadeIn());
  });
  //SHOWING MESSAGE THAT NEW USER HAS DISCONNECTED
  socket.on('chatNewUserDisconnected', function(newUserDis){
    $('#chatDetails').append($('<li>').text(newUserDis).fadeIn());
  });
  
});