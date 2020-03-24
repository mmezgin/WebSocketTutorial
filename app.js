const http = require('http');
const socketio = require('socket.io');
const server = http.createServer((req, res) => {
    res.end('Success2');
});

server.listen(3241);

const io = socketio.listen(server);
io.on('connection', (socket) => {
    socket.on('joinRoom', (data) => {
        socket.join(data.name, () => {
            console.log("Someone joined to room !");
            let count = io.sockets.adapter.rooms[data.name].length;
            io.to(data.name).emit('new join', { count }); //to odadaki diğer kişilerin bilgilendirilmesine yarıyor
            //socket.to = odaya giren dışındakileri bilgilendirir. io.to odaya giren dahil herkesi bilgilendirir4
            socket.emit('log', { message: 'You have joined this room !' })
        });
    });

});