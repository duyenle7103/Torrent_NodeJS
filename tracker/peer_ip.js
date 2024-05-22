// Initiate data storage
const torrentData = Object.create(null);
function addNewInfo(torrentData, postData) {
    var index = postData.info_hash;
    if (torrentData[index] === undefined) {
        torrentData[index] = [];
    }
    torrentData[index].push(postData.ip);
}

export { torrentData, addNewInfo };