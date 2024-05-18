import * as fs from 'fs'
import bencode from 'bencode'
import TorrentData from '../utility.js'

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
            pieces: torrentObj.pieces.join('')
        }
    }
    var torrentFile = bencode.encode(data);
    return torrentFile; 
}

function createTorrentFile(torrentObj, torrentPath) {
    var torrentFile = encodeBencode(torrentObj);
    fs.writeFileSync(torrentPath, torrentFile);
}

var torrentObj = new TorrentData();
torrentObj.announce = 'http://bttracker.debian.org:6969/announce';
torrentObj.comment = 'Debian CD from cdimage.debian.org';
torrentObj.created_by = 'mktorrent 1.1';
torrentObj.length = 659554304;
torrentObj.name = 'debian-12.5.0-amd64-netinst.iso';
torrentObj.piece_length = 262144;
torrentObj.pieces = ['12345678901234567890'];

createTorrentFile(torrentObj, '../client/testdata/output/debian-12.5.0-amd64-netinst.iso.torrent');