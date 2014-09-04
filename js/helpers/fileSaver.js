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
    if (typeof this.content != 'string') {
        throw new TypeError("The content of saved files must be a string. Got " + typeof this.content + " instead.");
    } else {
        var url;
        var blob = new Blob([this.content], {type: 'application/bonsai'});
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
    }
};

FileSaver.prototype.cpuToJson = function () {
    var removeAllBusReferences = function (o) {
        var keys = Object.keys(o);
        var copy = {};
        for (var i = 0; i < keys.length; i++) {
            if (!(o[keys[i]] instanceof Bus)) {
                if (typeof o[keys[i]] == 'object') {
                    copy[keys[i]] = removeAllBusReferences(o[keys[i]]);
                } else {
                    copy[keys[i]] = o[keys[i]];
                }
            }
        }
        return copy;
    };
    this.content = angular.toJson(removeAllBusReferences(this.content));
};