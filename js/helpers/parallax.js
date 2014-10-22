function parallax() {
    var body = document.body;
    var html = document.documentElement;
    var documentHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight);
    document.getElementById('parallaxbackgroundone').style.bottom = '-' +
        String(Math.floor(
                Math.max(0, (documentHeight - window.innerHeight - window.scrollY))
                / 4)) + 'px';
    document.getElementById('parallaxbackgroundtwo').style.bottom = '-' +
        String(Math.floor(
                Math.max(0, (documentHeight - window.innerHeight - window.scrollY))
                / 8)) + 'px';
}

var didScroll = false;
var performance = 30;
setTimeout(function () {
    var startTime = new Date().getTime();
    parallax();
    performance = Math.max(new Date().getTime() - startTime + 5, 30);
}, 1);
setInterval(function () {
    didScroll = true;
}, 500);

window.onscroll = function () {
    didScroll = true;
};

function tick() {
    if (didScroll) {
        didScroll = false;
        parallax();
    }
    setTimeout(tick, performance);
}
setTimeout(tick, performance);
