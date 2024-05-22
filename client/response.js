import express from 'express';
import bodyParser from 'body-parser';
import { requestPeer } from './download/request_peer.js';

let app = express();
app.use(bodyParser.json());

// Response when client received for peer's IP address
app.post('/announce/tracker', (req, res) => {
    console.log('Receiving data ...');
    console.log('Body is ', req.body);

    requestPeer(req.body.peers);
});

export { app };