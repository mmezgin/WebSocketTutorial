const http = require('http');
const socketio = require('socket.io');
const server = http.createServer((req, res) => {
    res.end('helololo ');
});

server.listen(3241);
const io = socketio.listen(server);

io.sockets.on('connection', (socket) => {
    console.log('User Connected !');

    socket.on('sendHello', (data) => {
        console.log(data.city + " " + data.name);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected !');
    });
    setTimeout(() => {
        socket.emit('say hi', { country: 'Turkey' });
    }, 2000);
});