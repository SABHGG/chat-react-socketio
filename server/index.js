import express from 'express';
import http from 'http';
import {Server as SocketServer} from 'socket.io';
import {dirname, join} from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const server = http.createServer(app);
const io = new SocketServer(server);


io.on('connection', socket => {
    console.log('New connection');
    const date = new Date();
    const time = date.getHours() + ':' + date.getMinutes();
    socket.on('message', (body) => {
        console.log(body);
        socket.broadcast.emit('message', {
            body,
            from: socket.id.slice(6),
            time
        });
    });

})

app.use(express.static(join(__dirname, '../client/dist')));

server.listen(4000)
console.log('Server on port', 4000);