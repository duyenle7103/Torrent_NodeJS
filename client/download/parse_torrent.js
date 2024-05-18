import * as fs from 'fs'
import bencode from 'bencode'
import TorrentData from '../utility.js'

// Split pieces into 20-byte length pieces
function splitPieces(pieces) {
    const hashLen = 20;
    if (pieces.length % hashLen !== 0) {
        throw new Error('Invalid pieces length');
    }
    var piecesArray = [];
    for (let i = 0; i < pieces.length; i += hashLen) {
        piecesArray.push(pieces.slice(i, i + hashLen));
    }
    return piecesArray;
}

// Parse torrent file
function parseTorrentFile(torrentPath) {
    // Read file and decode bencode
    const torrentFile = fs.readFileSync(torrentPath);
    const torrentData = bencode.decode(torrentFile);

    // Print decoded data for debugging
    // console.log(torrentFile);
    //console.log(torrentData);

    // Create new TorrentData object
    var torrentObj = new TorrentData();

    // Get data from decoded torrent file
    torrentObj.announce = new TextDecoder().decode(torrentData.announce);
    torrentObj.comment = new TextDecoder().decode(torrentData.comment);
    torrentObj.created_by = new TextDecoder().decode(torrentData['created by']);
    torrentObj.creation_date = new Date(torrentData['creation date'] * 1000).toUTCString();
    torrentObj.length = torrentData.info.length;
    torrentObj.name = new TextDecoder().decode(torrentData.info.name);
    torrentObj.piece_length = torrentData.info['piece length'];
    torrentObj.pieces = splitPieces(torrentData.info.pieces);

    console.log(torrentObj.announce);
    console.log(torrentObj.comment);
    console.log(torrentObj.created_by);
    console.log(torrentObj.creation_date);
    console.log(torrentObj.length);
    console.log(torrentObj.name);
    console.log(torrentObj.piece_length);
    console.log(torrentObj.pieces);
}

parseTorrentFile('../client/testdata/output/debian-12.5.0-amd64-netinst.iso.torrent');