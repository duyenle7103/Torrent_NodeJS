import express from 'express';

class TrackerResp {
    constructor() {
        this.interval = 0;
        this.peers = '';
    }
}

let app = express();

app.get('/announce', (req,res) => {
    // send input to the client
    res.send("bbbbbbbbbbHello yo world!");
});

export { app };