const http = require('http');
const socketio = require('socket.io');
const server = http.createServer((req, res) => {
    res.end('Success');
});

server.listen(3241);

const io = socketio.listen(server);
const nsp = io.of('/first');

nsp.on('connection', (socket) => {
    console.log('user connected');

    socket.on('press1', () => {
        nsp.emit('sendToAll', { name: 'mert' }); //socket.emit denseydi sadece yazana giderdi. ama nsp.emit dersen aynı namespacedeki her user a gider
    });

});