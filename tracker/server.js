import express from 'express';

let app = express();

app.get('/announce', (req,res) => {
    // send input to the client
    res.send("aaaaaaaaaaaaaaHello yo world!");
});

export { app };