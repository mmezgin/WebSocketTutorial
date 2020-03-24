const http = require('http');
const socketio = require('socket.io');
const server = http.createServer((req, res) => {
    res.end('selam ');
});

server.listen(3241);
const io = socketio.listen(server);

io.sockets.on('connection', (socket) => {
    console.log('User Connected !');

    socket.on('disconnect', () => {
        console.log('User disconnected !');
    });
});