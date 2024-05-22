import * as fs from 'fs'
import net from 'net'
import { torrentObj, outputPath } from "../main.js"

var index_w_content = [];
var connections = 0;
var expectedConnections = 0;

// Merge file
function merge() {
    const outputStream = fs.createWriteStream(outputPath);
    for (let i = 0; i < expectedConnections; i++) {
        outputStream.write(index_w_content[i]);
    }
    outputStream.end();

    outputStream.on('finish', () => {
        console.log(`Merged file saved as ${outputPath}`);
    });

    outputStream.on('error', (err) => {
        console.error('Error writing merged file:', err);
    });
}

function connect(peer, hash, index) {
    // Split IP and port
    const address = peer.split(':');
    const IP = address[0];
    const port_tcp = parseInt(address[1]) + 1;

    const client = new net.Socket();
    const chunks = [];

    client.connect(port_tcp, IP, () => {
        console.log('Connected to TCP server: ' + IP + ':' + port_tcp);
        console.log('Requesting piece ' + index + ': ' + hash);
        client.write(hash);
    });

    client.on('data', (data) => {
        chunks.push(data);
        client.end();
    });

    client.on('error', (err) => {
        console.error('TCP error:', err);
        client.destroy();
    });

    client.on('end', () => {
        const file = Buffer.concat(chunks);
        index_w_content[index] = file;
        connections++;
        if (connections === expectedConnections) {
            merge();
        }
        client.destroy();
    });
}

function requestPeer(peer_list) {
    expectedConnections = torrentObj.pieces.length;
    const num_peer = peer_list.length;

    // Create hash from piece
    var hash_piece = [];
    for (let i = 0; i < expectedConnections; i++) {
        // Turn Uint8Array into hash string
        hash_piece[i] = new TextDecoder().decode(torrentObj.pieces[i]);
    }

    // Connect to peers
    for (let i = 0; i < expectedConnections; i++) {
        connect(peer_list[i%num_peer], hash_piece[i], i);
    }
}

export { requestPeer }
