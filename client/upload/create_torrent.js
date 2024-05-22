import * as fs from 'fs'
import bencode from 'bencode'

function encodeBencode(torrentObj) {
    var data = {
        announce: torrentObj.announce,
        comment: torrentObj.comment,
        'created by': torrentObj.created_by,
        'creation date': Math.floor(Date.now() / 1000),
        info: {
            length: torrentObj.length,
            name: torrentObj.name,
            'piece length': torrentObj.piece_length,
            pieces: torrentObj.pieces
        }
    }
    var torrentFile = bencode.encode(data);
    return torrentFile; 
}

export function createTorrentFile(torrentObj, torrentPath) {
    var torrentFile = encodeBencode(torrentObj);
    fs.writeFileSync(torrentPath, torrentFile);
}