const path = require('path');
const http = require('http');

const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const {userJoin, userLeaves} = require('./utils/users');
const formatMessage = require( './utils/messages' );
const port = process.env.PORT || 3000;
const sender = 'Geotag : '

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

io.on('connection', (socket) => {

  socket.on('join', () => {
    const user = userJoin(socket.id)
    socket.join(user.room)

    //when a new user connects
    socket.emit('message', formatMessage(sender,'Welcome to our microservice'));
    console.log("user connected")
  })

    //when a user disconnects
  socket.on('disconnect', ()=>{
    userLeaves(socket.id)
    console.log("user disconnected")
  })

  //listen for locationChange
  socket.on('locationChange', (message)=>{
    console.log("location changed to ", message)
    socket.emit('message', 'Your location has been changed');
  })
})



server.listen(port, () => {
  console.log("Server is running on port " + port)
})