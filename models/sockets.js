class Sockets {
    constructor(io) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        this.io.on('connection', (socket) => { 
            socket.on('message-to-server', (data) => {
                console.log('client says', data)
                socket.emit('message-from-server', data)
            })
        });
    }
}

module.exports = Sockets;