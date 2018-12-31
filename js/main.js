'use strict';

var gVideos;

function init() {
    //video
    var videosPrm = getVideos('guacamole');
    videosPrm.then(renderVideos);
    //info
    let infoPrm = getInfo('guacamole');
    infoPrm.then(renderInfo);
    //footer
    renderFooter();
}

function search(ev) {
    if (ev && ev.keyCode !== 13) return;

    let key = document.querySelector('#search').value;

    saveToStorage(key);
    //video
    var videosPrm = getVideos(key);
    videosPrm.then(renderVideos);
    //info
    let infoPrm = getInfo(key);
    infoPrm.then(renderInfo);
    renderFooter();
}

function renderVideos(videos) {
    console.log('vid', videos);

    gVideos = videos;
    //main video
    document.querySelector('.main-video').innerHTML =
        `<iframe src="https://www.youtube.com/embed/${gVideos[0].url}" id="${gVideos[0].url}"></iframe>`;

    //side videos
    var strHtmls = gVideos.map(video =>
        `<div>
        <img id="${video.url}" src="${video.img}" onclick="onSetMainVideo(this)">
        <b>${video.title}</b>
        </div>`
    );
    //take main video out
    strHtmls.shift();

    strHtmls.join();
    document.querySelector('.side-videos').innerHTML = strHtmls;
}

function onSetMainVideo(elVid) {
    setMainVideo(elVid);
    renderVideos(gVideos);
}

function renderInfo(infos) {
    //take out serach term
    infos.shift();
    console.log('info', infos);
    let elInfo = document.querySelector('.info');
    var strHtmls = '';
    for (let i = 0; i < infos.length; i++) {
        //dont render if dosent exict
        if (!infos[0][i]) continue;
        strHtmls += `<a href=${infos[2][i]}>
                        <h2>${infos[0][i]}</h2>
                        <p>${infos[1][i]}</p>
                    </a>`
    }
    elInfo.innerHTML = strHtmls;
}

function renderFooter() {
    var keys = getSearchKeys();
    var elFooter = document.querySelector('footer');
    elFooter.innerHTML = 'Search History: ';
    elFooter.innerHTML += keys.join(', ');
}