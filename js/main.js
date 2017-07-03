var videos = document.getElementsByTagName("video");
var fraction = 0.2;

Array.prototype.forEach.call(videos, function (v) {
    checkScroll(v);
});

function checkAll() {
    for(var i = 0; i < videos.length; i++) {
        checkScroll(videos[i]);
    }
}

function checkScroll(video) {
    var box = video;
    if (video.dataset && video.dataset.parent) {
        for (var i=0; i<video.dataset.parent; i++){
            box = box.parentNode;
        }
    }
    var x = box.offsetLeft, y = box.offsetTop, w = box.offsetWidth, h = box.offsetHeight, r = x + w, //right
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

function throttle(fn, threshold, scope) {
    threshold || (threshold = 150);
    var last,
        deferTimer;
    return function () {
        var context = scope || this;

        var now = +new Date,
            args = arguments;
        if (last && now < last + threshold) {
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = now;
                fn.apply(context, args);
            }, threshold);
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
}

window.addEventListener('scroll', throttle(checkAll), false);
window.addEventListener('resize', throttle(checkAll), false);