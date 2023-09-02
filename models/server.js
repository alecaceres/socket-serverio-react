const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // HTTP server
        this.server = http.createServer(this.app);

        // Sockets settings
        this.io = socketio(this.server, {
            // settings
        });
    }

    middlewares() {
        this.app.use( express.static( path.resolve(__dirname, '../public') ))
    }

    setUpSockets() {
        new Sockets(this.io)
    }

    execute() {
        // initialise middlewares
        this.middlewares();

        // initialise sockets
        this.setUpSockets();

        // initialise server
        this.server.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

module.exports = Server;