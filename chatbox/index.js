var socket = io();

var form = document.getElementById('form');
var input = document.getElementById('input');
var user = document.getElementById('user');

(window.location !== window.parent.location)
  ? console.log('in frame')
  : console.log('not in frame')

if (localStorage.user) {
  user.value = localStorage.user;
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  localStorage.user = user.value

  if (input.value) {
    socket.emit('chat message', {
      message: input.value,
      user: user.value ? user.value : 'anonymous',
      color: localStorage.color
  });
    input.value = '';
  }
});

socket.on('chat logs', function(logs) {
  for(i in logs) {
    var item = document.createElement('li');
    item.textContent = `${logs[i].user}: ${logs[i].message}`;
    item.style.backgroundColor = logs[i].color
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);  
  }
})

socket.on('error send', function(message) {
  input.value = message
})

socket.on('discord chat message', function(msg) {
  var item = document.createElement('li');
  item.textContent = `${msg.user}: ${msg.message}`;
  item.style.backgroundColor = msg.color
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on('chat message', function(msg) {
  var item = document.createElement('li');
  item.textContent = `${msg.user}: ${msg.message}`;
  item.style.backgroundColor = msg.color
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});