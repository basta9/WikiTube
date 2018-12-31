'use strict';

function getVideos(key) {
    var prm = axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=AIzaSyCHgueGtPcP4OpYKxzsJzu7PPjK9dNpvHE&q=${key}`);

    return prm.then(res => res.data.items.map(function (video) {
        return {
            url: video.id.videoId,
            title: video.snippet.title,
            img: video.snippet.thumbnails.default.url
        }
    }));
}

function setMainVideo(elVid) {
    let holdVid = gVideos[0];
    let idx = getIdxByVid(elVid.id);
    gVideos[0] = getVideoById(elVid.id)[0];
    gVideos[idx] = holdVid;
}

function getInfo(term) {
    return axios.get(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${term}&limit=5`)
        .then(res => res.data);
}

function getVideoById(id) {
    return gVideos.filter(video => video.url === id);
}

function getIdxByVid(id) {
    return gVideos.findIndex(video => video.url === id);
}

function saveToStorage(key) {
    let keys = localStorage.getItem('searchKeys');
    //if first search
    // debugger
    if (!keys) {
        localStorage.searchKeys = JSON.stringify([key]);
        return;
    }
    keys = JSON.parse(keys);
    keys.push(key);
    localStorage.searchKeys = JSON.stringify(keys);
}

function getSearchKeys() {
    return JSON.parse(localStorage.getItem('searchKeys'));
}