/**
 * Come Again?
 * Copyright 2014 Seb Pearce
 * Licensed under the MIT license.
 * 
 * Thanks to:
 * 
 * Ben Crowder, whose project "crosswrite" inspired this idea:
 * https://github.com/bencrowder/crosswrite
 * 
 * Michael Gerhäuser, who supplied the basic code to get me started:
 * http://www.michael-gerhaeuser.de/?f=fileapi/readme.html
 * 
 * Bjørn Klinggaard, who created the excellent bPopup.js jQuery plugin:
 * http://dinbror.dk/blog/bPopup/
 * 
 * John Resig, who created the jQuery Hotkeys plugin:
 * https://github.com/jeresig/jquery.hotkeys
 */

var chooser = document.getElementById('chooser');
var dragndrop = document.getElementById('dragndrop');
var player = document.getElementById('player');
var bigmessage = document.getElementById('bigmessage');
var spacebaricon = document.getElementById('spacebaricon');
var refresh = document.getElementById('refresh');
var playerlabel = document.getElementById('playerlabel');
var guide = document.getElementById('guide');
var back4 = document.getElementById('back4');
var back3 = document.getElementById('back3');
var back2 = document.getElementById('back2');
var back1 = document.getElementById('back1');
var forward4 = document.getElementById('forward4');
var forward3 = document.getElementById('forward3');
var forward2 = document.getElementById('forward2');
var forward1 = document.getElementById('forward1');


function supportsFileAPI() {
    // File:        Provides read-only information such as name, type, size
    //                  and last modified date.
    // FileReader:  Object to read the file.
    return window.File && window.FileReader && window.chooser;
}

function hideControls() {
    chooser.style.display = 'none';
    dragndrop.style.display = 'none';
    player.style.display = 'none';
    playerlabel.style.display = 'none';
    guide.style.display = 'none';
    refresh.style.display = 'none';
    document.getElementById('notsupported').style.display = 'block';
}

// check that browser supports the FileAPI
if (!supportsFileAPI())
{
    hideControls();
}
else
{


// ==================== Do this if File API is supported ====================

function handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();

    dragndrop.style.border = '1px solid #444';
    dragndrop.style.backgroundColor = 'rgb(230,230,230)';
}

function handleDragLeave(e) {
    e.stopPropagation();
    e.preventDefault();

    dragndrop.style.border = '';
    dragndrop.style.backgroundColor = '';
}

function handleDrop(e) {
    e.stopPropagation();
    e.preventDefault();

    var f = e.dataTransfer.files[0];

    loadFileIntoPlayer(f);
}

function handleChooser(e) {
    var f = e.target.files[0];
    loadFileIntoPlayer(f);
}

function loadFileIntoPlayer(f) {

    // make a new instance of FileReader
    var freader = new FileReader();

    freader.onload = function(e) {
        // set player source
        player.src = e.target.result;
        $('#playerlabel').animate({'margin-left': '0'},1000);
        $('#guide').show();
        $('#guide').animate({'margin-top': '0'},1000);
    }

    // read file contents and execute onload code (above)
    freader.readAsDataURL(f);

    // display filename as heading
    playerlabel.innerHTML = f.name;
    bigmessage.innerHTML = 
        'Use your keyboard to control playback &mdash; see below.';

    // hide dragndrop controls
    dragndrop.style.display = 'none';
    chooser.style.display = 'none';

    // show refresh tip
    refresh.style.display = 'block';
    
}


// ============================= bPopUp code ================================

// See page at http://dinbror.dk/blog/bPopup/

// $ is assigned to jQuery
(function($) {

     // DOM Ready
    $(function() {

        // Binding a click event
        $('#helplink').bind('click', function(e) {

            // Prevents the default action to be triggered. 
            e.preventDefault();

            // Triggering bPopup when click event is fired
            $('#helpdialog').bPopup();

        });

    });

})(jQuery);


// =========================== Player functions =============================

// The hotkeys.js plugin doesn't allow arguments in the functions that you
// bind to it, so I had to create separate functions for each time interval.

// Without the "if (player.readyState == 4)" bits, I was getting console
// errors for referencing currentTime before the audio element was loaded.

function rewind_1() {
    if (player.readyState == 4) { player.currentTime -= 1; }
    return false;
}

function rewind_2() {
    if (player.readyState == 4) { player.currentTime -= 2; }
    return false;
}

function rewind_3() {
    if (player.readyState == 4) { player.currentTime -= 3; }
    return false;
}

function rewind_4() {
    if (player.readyState == 4) { player.currentTime -= 4; }
    return false;
}

function skip_1() {
    if (player.readyState == 4) { player.currentTime += 1; }
    return false;
}

function skip_2() {
    if (player.readyState == 4) { player.currentTime += 2; }
    return false;
}

function skip_3() {
    if (player.readyState == 4) { player.currentTime += 3; }
    return false;
}

function skip_4() {
    if (player.readyState == 4) { player.currentTime += 4; }
    return false;
}

function togglePlay() {
    if (player.readyState == 4) {
        if (player.paused) {
            player.play();
            spacebaricon.className = "fa fa-pause fa-2x";
        } else {
            player.pause();
            spacebaricon.className = "fa fa-play fa-2x";
        }
    }
    return false;
}

function inc_volume() {
    if (player.volume < 1) {
        player.volume += 0.2;
    }
    return false;
}

function dec_volume() {
    if (player.volume > 0) {
        player.volume -= 0.2;
    }
    return false;
}


// ============================== Hotkeys ===================================

$(document).ready(function(){

    // numbers

    $(document).bind('keydown', '1', rewind_1);
    $(document).bind('keydown', '2', rewind_2);
    $(document).bind('keydown', '3', rewind_3);
    $(document).bind('keydown', '4', rewind_4);

    // home row

    $(document).bind('keydown', 'f', rewind_1);
    $(document).bind('keydown', 'd', rewind_2);
    $(document).bind('keydown', 's', rewind_3);
    $(document).bind('keydown', 'a', rewind_4);

    $(document).bind('keydown', 'j', skip_1);
    $(document).bind('keydown', 'k', skip_2);
    $(document).bind('keydown', 'l', skip_3);
    $(document).bind('keydown', ';', skip_4);
    
    $(document).bind('keydown', 'F', rewind_1);
    $(document).bind('keydown', 'D', rewind_2);
    $(document).bind('keydown', 'S', rewind_3);
    $(document).bind('keydown', 'A', rewind_4);

    $(document).bind('keydown', 'J', skip_1);
    $(document).bind('keydown', 'K', skip_2);
    $(document).bind('keydown', 'L', skip_3);

    // arrow keys

    $(document).bind('keydown', 'left', rewind_2);
    $(document).bind('keydown', 'right', skip_2);
    $(document).bind('keydown', 'up', inc_volume);
    $(document).bind('keydown', 'down', dec_volume);

    $(document).bind('keydown', 'space', togglePlay);

});


// ============================ Event listeners =============================

// event listeners for dragndrop
dragndrop.addEventListener('dragover', handleDragOver, false);
dragndrop.addEventListener('dragleave', handleDragLeave, false);
dragndrop.addEventListener('drop', handleDrop, false);

// listener for chooser
chooser.addEventListener('change', handleChooser, false);

// listener for spacebar icon
spacebar.addEventListener('click', togglePlay, false); 

// listener for rewind/skip buttons
back4.addEventListener('click', rewind_4, false); 
back3.addEventListener('click', rewind_3, false); 
back2.addEventListener('click', rewind_2, false); 
back1.addEventListener('click', rewind_1, false); 
forward4.addEventListener('click', skip_4, false); 
forward3.addEventListener('click', skip_3, false); 
forward2.addEventListener('click', skip_2, false); 
forward1.addEventListener('click', skip_1, false); 

// listener for audio element
player.addEventListener('ended', function(e) {
    player.pause();
    spacebaricon.className = "fa fa-play fa-2x";
    player.currentTime = 0;
    return false;
}, false);

// listener for audio element
player.addEventListener('pause', function(e) {
    spacebaricon.className = "fa fa-play fa-2x";
    return false;
}, false);

// listener for audio element
player.addEventListener('play', function(e) {
    spacebaricon.className = "fa fa-pause fa-2x";
    return false;
}, false);


} // end of huge else statement



