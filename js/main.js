var videos = document.getElementsByTagName("video");
var fraction = 0.8;

Array.prototype.forEach.call(videos, function (v) {
    checkScroll(v);
});

function checkAll() {
    for(var i = 0; i < videos.length; i++) {
        checkScroll(videos[i]);
    }
}

function checkScroll(video) {
        var x = video.offsetLeft, y = video.offsetTop, w = video.offsetWidth, h = video.offsetHeight, r = x + w, //right
            b = y + h, //bottom
            visibleX, visibleY, visible;

        visibleX = Math.max(0, Math.min(w, window.pageXOffset + window.innerWidth - x, r - window.pageXOffset));
        visibleY = Math.max(0, Math.min(h, window.pageYOffset + window.innerHeight - y, b - window.pageYOffset));

        visible = visibleX * visibleY / (w * h);

        if (visible > fraction) {
            video.play();
        } else {
            video.pause();
        }
}

window.addEventListener('scroll', checkAll, false);
window.addEventListener('resize', checkAll, false);