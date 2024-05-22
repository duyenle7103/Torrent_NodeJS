import request from 'request';
import { torrentObj, IPAddress, port } from "../main.js";

function requestSinglePeer(peer, hash) {
    var url = 'http://' + peer.IP + ':' + peer.port + '/announce/client' + '?' + 'IP=' + IPAddress + '&port=' + port;

    request(url, function (error, response, body) {
        console.log('Sending request to client: ', url);
        console.log('Error: ', error);
        return;
    });
}

export function requestPeer(peer_list) {
    var hash_piece = [];
    for (let i = 0; i < torrentObj.pieces.length; i++) {
        hash_piece[i] = new TextDecoder().decode(torrentObj.pieces[i]);
    }
    requestSinglePeer(peer_list[0]);
}