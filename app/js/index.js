var app = angular.module('seasonPremiere', ['ngResource', 'ngRoute']);



//some general config and global variables so angular has no problems later.
var peerflix = require('peerflix');
var os = require('os');
var path = require('path');
var fs = require('fs');
var showsearcher = require('showsearcher');

// Load native UI library
var gui = require('nw.gui');

// Get the current window
var win = gui.Window.get();

//get OS temp folder and create a seasonpremiere folder to put data later on...
tmpFolder = path.join(os.tmpDir(), 'seasonPremiere');

if (!fs.existsSync(tmpFolder)) {
    fs.mkdir(tmpFolder);
}




//catch not handled node errors so the app does not crash
process.on('uncaughtException', function(err) {
    console.log(err);
});

$('.resize').on('click', function() {
    if (win.isFullscreen) {
        win.leaveFullscreen();
        win.focus();
    } else {
        win.enterFullscreen();
        win.focus();
    }
});