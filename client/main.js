import promptSync from 'prompt-sync';
import * as network from './network.js';
import { app } from './server.js';
import { TorrentData } from './utility.js';
import { parseTorrentFile } from './download/parse_torrent.js';
import { createPeerID, buildTrackerURL, sendRequestToTracker } from './download/tracker_download.js';
import { splitFile } from './upload/split_file.js';
import { createTorrentFile } from './upload/create_torrent.js';
import { sendUploadSignal } from './upload/post_request.js';
import { calInfoHash } from './upload/info_hash.js';

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

var hash_w_pieces;
var torrentObj;

// Ask user for what to do
console.log('Enter:\n\t1: To download a file\n\t2: To upload a file\n\t3: Do nothing');
const choice = prompt('Your choice: ');
if (choice === '1') {
    const inputPath = prompt('Enter the path to the torrent file: ');
    const outputPath = prompt('Enter the path to save the file: ');

    // Parse torrent file
    torrentObj = parseTorrentFile(inputPath);
    const peerID = createPeerID();
    var trackerURL = buildTrackerURL(torrentObj, peerID, port);
    sendRequestToTracker(torrentObj, trackerURL);
} else if (choice === '2') {
    const inputPath = prompt('Enter the path to the file to upload: ');
    const outputPath = prompt('Enter the path to save the torrent file: ');
    const trackerURL = prompt('Enter the tracker URL: ');
    const comment = prompt('Enter the comment: ');
    const createdBy = prompt('Enter the creator: ');
    const filename = prompt('Enter the filename: ');
    
    // Read file and split into pieces
    var torrentObj = new TorrentData();
    torrentObj.announce = trackerURL;
    torrentObj.comment = comment;
    torrentObj.created_by = createdBy;
    torrentObj.name = filename;

    hash_w_pieces = splitFile(torrentObj, inputPath);
    createTorrentFile(torrentObj, outputPath);
    var info_hash = calInfoHash(outputPath);
    torrentObj.info_hash = info_hash;

    // Send upload information to tracker
    sendUploadSignal(torrentObj, IPAddress, port);
}

export { hash_w_pieces, torrentObj, IPAddress, port};