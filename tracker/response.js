import express from 'express';
import bodyParser from 'body-parser';
import { torrentData, addNewInfo } from './peer_ip.js';
import { sendInfoToClient } from './request.js';

let app = express();
app.use(bodyParser.json());

// Response when client request for peer's IP address
app.get('/announce/download', (req, res) => {
    var obj = req.query;
    var IP = req.ip.split(':')[3];
    const port = obj.port;

    console.log('Searching for peers uploading file: ', obj.info_hash);
    if (torrentData[obj.info_hash] === undefined) {
        console.log('No peers found');
        sendInfoToClient(IP, port, { interval: 900, peers: '' });
    } else {
        var data = {
            interval: 900,
            peers: torrentData[obj.info_hash]
        }
        sendInfoToClient(IP, port, data);
    }
});

// Response when client upload file
app.post('/announce/upload', (req, res) => {
    console.log('Receiving data ...');
    console.log('Body is ', req.body);
    addNewInfo(torrentData, req.body);
    console.log('TorrentData is ', torrentData);
});

export { app };