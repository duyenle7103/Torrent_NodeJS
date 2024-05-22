import net from 'net'
import { hash_w_pieces } from '../main.js'

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        console.log('Client requested for piece: ', new TextDecoder().decode(data));
        socket.write(hash_w_pieces[data]);
        socket.end();
    });

    socket.on('error', (err) => {
        console.error('TCP error:', err);
    });

    socket.on('end', () => {
    });
});

export { server };