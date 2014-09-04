'use strict';

function FileSaver (content, defaultFilename, filename) {
    this.content = content;
    this.filename = "file.txt";
    if (defaultFilename) {
        this.filename = defaultFilename;
    }
    if (filename) {
        this.filename = filename;
    }
}

FileSaver.prototype.save = function () {
    var url;
    var blob = new Blob([this.content], {type : 'application/bonsai'});
    if (window.webkitURL) {
        url = window.webkitURL.createObjectURL(blob);
    } else {
        url = window.URL.createObjectURL(blob);
    }
    // initiate download by adding a <a> element and invoking a click on it
    var downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = this.filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
};