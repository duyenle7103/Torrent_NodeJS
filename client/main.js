import promptSync from 'prompt-sync';
import * as network from './network.js';
import { app } from './server.js';
import { parseTorrentFile } from './download/parse_torrent.js';
import { createPeerID, buildTrackerURL } from './download/tracker_download.js';

// Initialize prompt for user input
const prompt = promptSync();

// Get IP address of the tracker
const IPAddress = network.getIP();
console.log("Client's IP Address: ", IPAddress);

// Get port number from user
const port = prompt('Enter your port: ');

// Start the tracker server
app.listen(port, () => {
    console.log(`Client running at http://${IPAddress}:${port}`);
});

// Ask user for what to do
console.log('Enter:\n\t1: To download a file\n\t2: To upload a file\n\t3: Do nothing');
const choice = prompt('Your choice: ');
if (choice === '1') {
    const inputPath = prompt('Enter the path to the torrent file: ');
    const outputPath = prompt('Enter the path to save the file: ');

    // Parse torrent file
    var torrentObj = parseTorrentFile(inputPath);
    const peerID = createPeerID();
    var trackerURL = buildTrackerURL(torrentObj, peerID, port);
}