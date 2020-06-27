const socketio = require('socket.io');

let io;
const connections = []; //salvar no banco de dados para evitar gargalo da memoria local

exports.setupWebSocket = server => {
    io = socketio(server);
    io.on('connection', socket => {

        const { store_id } = socket.handshake.query;

        connections.push({
            id: socket.id,
            store_id
        })

        console.log(connections)
    })
};

exports.findConnections = id => connections.filter(item => id == item.store_id)

exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
    })
}
