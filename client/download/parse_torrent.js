import * as fs from 'fs'
import bencode from 'bencode'
import crypto from 'crypto'
import { TorrentData } from '../utility.js'

// Calculate info-hash as 20-byte value
export function calculateInfoHash(torrentData) {
    const info_bencode = bencode.encode(torrentData.info);
    var info_hash = crypto.createHash('sha1').update(info_bencode).digest();
    var result = new Uint8Array(info_hash);
    return result;
}

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
export function parseTorrentFile(torrentPath) {
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
    torrentObj.info_hash = calculateInfoHash(torrentData);
    torrentObj.comment = new TextDecoder().decode(torrentData.comment);
    torrentObj.created_by = new TextDecoder().decode(torrentData['created by']);
    torrentObj.creation_date = new Date(torrentData['creation date'] * 1000).toUTCString();
    torrentObj.length = torrentData.info.length;
    torrentObj.name = new TextDecoder().decode(torrentData.info.name);
    torrentObj.piece_length = torrentData.info['piece length'];
    torrentObj.pieces = splitPieces(torrentData.info.pieces);

    // Print extracted data for debugging
    console.log('********** ********** **********');
    console.log('Url of tracker: ', torrentObj.announce);
    console.log('Info-hash of file: ', torrentObj.info_hash);
    console.log('Comment: ', torrentObj.comment);
    console.log('Created by: ', torrentObj.created_by);
    console.log('Creation date: ', torrentObj.creation_date);
    console.log('File total length: ', torrentObj.length);
    console.log('File name: ', torrentObj.name);
    console.log('Piece length: ', torrentObj.piece_length);
    //console.log(torrentObj.pieces);
    console.log('********** ********** **********');

    return torrentObj;
}