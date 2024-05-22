import * as fs from 'fs'
import crypto from 'crypto'

function splitFile(torrentObj, inputPath) {
    const file = fs.readFileSync(inputPath);
    const fileSize = file.length;
    const pieceLength = 262144;

    // Split file into pieces with equal length
    const pieces = [];
    for (let i = 0; i < fileSize; i += pieceLength) {
        pieces.push(file.slice(i, i + pieceLength));
    }

    // SHA1 hash of each piece
    const piece_hashes = [];
    const hash_w_pieces = {};
    for (let i = 0; i < pieces.length; i++) {
        const piece = pieces[i];
        const hash = crypto.createHash('sha1').update(piece).digest();
        piece_hashes.push(hash);
        hash_w_pieces[hash] = piece;
    }
    var concatenated = Buffer.concat(piece_hashes);
    var concatArray = new Uint8Array(concatenated);

    torrentObj.length = fileSize;
    torrentObj.piece_length = pieceLength;
    torrentObj.pieces = concatArray;

    // Print extracted data for debugging
    // console.log(torrentObj.announce);
    // console.log(torrentObj.comment);
    // console.log(torrentObj.created_by);
    // console.log(torrentObj.length);
    // console.log(torrentObj.name);
    // console.log(torrentObj.piece_length);
    // console.log(torrentObj.pieces);

    return hash_w_pieces;
}

export { splitFile }