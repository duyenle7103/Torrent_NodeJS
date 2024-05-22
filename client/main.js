import promptSync from 'prompt-sync';
import * as network from './network.js';
import { app } from './response.js';
import { TorrentData } from './utility.js';
import { parseTorrentFile } from './download/parse_torrent.js';
import { sendRequestToTracker } from './download/request_tracker.js';
import { splitFile } from './upload/split_file.js';
import { createTorrentFile } from './upload/create_torrent.js';
import { sendUploadSignal } from './upload/request_post.js';
import { server } from './upload/send_file.js';

// Global variables
var hash_w_pieces;
var torrentObj;
var outputPath;

// Initialize prompt for user input
const prompt = promptSync();

// Get IP address of the tracker
const IPAddress = network.getIP();
console.log("Client's IP Address: ", IPAddress);

// Get port number from user
const port = prompt('Enter your port: ');
const port_tcp = parseInt(port, 10) + 1;

// Start the client server
app.listen(port, () => {
    console.log(`Client running at http://${IPAddress}:${port}`);
});

// Start the TCP server
server.listen(port_tcp, () => {
    console.log(`TCP server listening on port ${port_tcp}`);
});

// Ask user for what to do
console.log('Enter:\n\t1: To download a file\n\t2: To upload a file\n\t3: Do nothing');
const choice = prompt('Your choice: ');
if (choice === '1') {
    const inputPath = prompt('Enter the path to the torrent file: ');
    outputPath = prompt('Enter the path to save the file: ');

    // Parse torrent file
    torrentObj = parseTorrentFile(inputPath);
    sendRequestToTracker(torrentObj, port);
} else if (choice === '2') {
    var torrentObj = new TorrentData();

    const inputPath = prompt('Enter the path to the file to upload: ');
    const outputPath = prompt('Enter the path to save the torrent file: ');
    torrentObj.announce = prompt('Enter the tracker URL: ');
    torrentObj.comment = prompt('Enter the comment: ');
    torrentObj.created_by = prompt('Enter the creator: ');
    torrentObj.name = prompt('Enter the filename: ');
    
    // Read file and split into pieces
    hash_w_pieces = splitFile(torrentObj, inputPath);
    torrentObj.info_hash = createTorrentFile(torrentObj, outputPath);

    // Send upload information to tracker
    sendUploadSignal(torrentObj, IPAddress, port);
}

export { hash_w_pieces, torrentObj, outputPath, IPAddress, port, port_tcp };