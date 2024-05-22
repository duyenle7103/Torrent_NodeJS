import express from 'express';
import bodyParser from 'body-parser';
import { hash_w_pieces } from './main.js';
// import { sendInfoToClient } from 'upload/send.js'
import { requestPeer } from './download/peer.js';

var peer_list = [];

let app = express();
app.use(bodyParser.json());

app.post('/announce/tracker', (req,res) => {
    console.log('Receiving data ...');
    console.log('Body is ', req.body);

    // Split IP and port
    var IP_list = req.body.peers;
    for (let i = 0; i < IP_list.length; i++) {
        var IP = IP_list[i].split(':')[0];
        var port = IP_list[i].split(':')[1];
        var peer = {
            IP: IP,
            port: port
        };
        peer_list.push(peer);
    }
    requestPeer(peer_list);
});

app.get('/announce/client', (req, res) => {
    var obj = req.query;
    const IP = obj.IP;
    const port = obj.port;

    console.log('Connected to client: ' + IP + ' on port: ' + port);
    // console.log('Client requesting piece: ', );

    
});

export { app };