import * as fs from 'fs'
import bencode from 'bencode'
import crypto from 'crypto'

export function calInfoHash(torrentPath) {
    // Read file and decode bencode
    const torrentFile = fs.readFileSync(torrentPath);
    const torrentData = bencode.decode(torrentFile);

    const info_bencode = bencode.encode(torrentData.info);
    var info_hash = crypto.createHash('sha1').update(info_bencode).digest();
    var result = new Uint8Array(info_hash);
    return result;
}