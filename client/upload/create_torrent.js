import * as fs from 'fs'
import bencode from 'bencode'
import crypto from 'crypto'

function createTorrentFile(torrentObj, torrentPath) {
    // Create new torrent file
    var data = {
        announce: torrentObj.announce,
        comment: torrentObj.comment,
        'created by': torrentObj.created_by,
        'creation date': Math.floor(Date.now() / 1000),
        name: torrentObj.name,
        info: {
            length: torrentObj.length,
            'piece length': torrentObj.piece_length,
            pieces: torrentObj.pieces
        }
    }
    var torrentFile = bencode.encode(data);
    fs.writeFileSync(torrentPath, torrentFile);

    // Calculate info-hash as 20-byte value
    const info_bencode = bencode.encode(data.info);
    const info_hash = crypto.createHash('sha1').update(info_bencode).digest();
    var result = new Uint8Array(info_hash);

    console.log('Torrent file created successfully at: ', torrentPath);
    console.log('Info-hash of file: ', result);

    return result;
}

export { createTorrentFile };