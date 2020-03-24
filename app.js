const http = require('http');
const socketio = require('socket.io');
const server = http.createServer((req, res) => {
    res.end('Success2');
});

server.listen(3241);

const io = socketio.listen(server);
io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('joinRoom', (data) => {
        socket.join(data.name, () => {
            console.log("Someone joined to room !");
            let count = io.sockets.adapter.rooms[data.name].length;
            io.to(data.name).emit('new join', { count: getOnlineCount(io, data) }); //to odadaki diğer kişilerin bilgilendirilmesine yarıyor
            //socket.to = odaya giren dışındakileri bilgilendirir. io.to odaya giren dahil herkesi bilgilendirir4
            socket.emit('log', { message: 'You have joined this room !' })
        });
    });
    socket.on('leaveRoom', (data) => {
        socket.leave(data.name, () => {

            io.to(data.name).emit('leavedRoom', { count: getOnlineCount(io, data) });
            socket.emit('socket.leaved', { message: 'You left the room' });
        });
    });
});
const getOnlineCount = (io, data) => {
    const room = io.sockets.adapter.rooms[data.name];
    return room ? room.length : 0;
};