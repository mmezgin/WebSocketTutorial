const http = require('http');
const socketio = require('socket.io');
const server = http.createServer((req, res) => {
    res.end('hey!');
});

server.listen(3241);

const io = socketio.listen(server);

io.sockets.on('connection', (socket) => {
    console.log('User connected your web');

    socket.on('disconnect', () => {
        console.log('User disconnected from your web');
    });
    socket.on('new-user', (data) => {
        socket.broadcast.emit('user', { name: data.name }); // broadcast lets the users comminicate each other
    });

});