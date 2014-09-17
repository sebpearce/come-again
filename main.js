// 'use strict';

/**
 * Come Again?
 * Copyright 2014 Seb Pearce
 * Licensed under the MIT license.
 * 
 */


var chooser = document.getElementById('chooser');
var dragNDrop = document.getElementById('drag-n-drop');
var player = document.getElementById('player');
var bigMessage = document.getElementById('big-message');
var spaceBarIcon = document.getElementById('spacebar-icon');
var playerLabel = document.getElementById('player-label');
var guide = document.getElementById('guide');
var back4 = document.getElementById('back-4');
var back3 = document.getElementById('back-3');
var back2 = document.getElementById('back-2');
var back1 = document.getElementById('back-1');
var forward4 = document.getElementById('forward-4');
var forward3 = document.getElementById('forward-3');
var forward2 = document.getElementById('forward-2');
var forward1 = document.getElementById('forward-1');
var gLabel = document.getElementById('g-label');
var hLabel = document.getElementById('h-label');
var loopStartButton = document.getElementById('loop-start-button');
var loopEndButton = document.getElementById('loop-end-button');
var loopLabel = document.getElementById('bottom-loop-label');
var loopText = document.getElementById('loop-text');
var slowBar1 = document.getElementById('slow-bar-1');
var slowBar2 = document.getElementById('slow-bar-2');
var slowBar3 = document.getElementById('slow-bar-3');
var slowButton = document.getElementById('slow');
var transcriptionSection = document.getElementById('transcription-section');
var transcriptionBox = document.getElementById('transcription-box');
var transcribeButton = document.getElementById('transcribe-button');
var stopTranscribeButton = document.getElementById('stop-transcribe-button');
var loopStart = -1;
var loopEnd = -1;
var slowLevel = 1;
var fontSize = 24;
var isLooping = false;
var isTranscriptionMode = false;





function supportsFileAPI() {
    // File:        Provides read-only information such as name, type, size
    //                  and last modified date.
    // FileReader:  Object to read the file.
    return window.File && window.FileReader && window.chooser;
}

function hideControls() {
    chooser.style.display = 'none';
    dragNDrop.style.display = 'none';
    player.style.display = 'none';
    playerLabel.style.display = 'none';
    guide.style.display = 'none';
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

    dragNDrop.style.border = '1px solid #444';
    dragNDrop.style.backgroundColor = 'rgb(230,230,230)';
}

function handleDragLeave(e) {
    e.stopPropagation();
    e.preventDefault();

    dragNDrop.style.border = '';
    dragNDrop.style.backgroundColor = '';
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

function showGuide() {
    $('#guide').show();
    $('#guide').animate({'margin-top': '0'},500);
}

function hideGuide() {
    $('#guide').animate({'margin-top': '1000px'}, 500, function(){
        $('#guide').hide();
    });
}

function showTranscriptionSection() {
    $('#transcription-section').show();
    $('#transcription-section').animate({'margin-top': '0'},500,function(){
        transcriptionBox.focus()
    });
    isTranscriptionMode = true;
    return false;
}

function hideTranscriptionSection() {
    $('#transcription-section').animate({'margin-top': '1000px'}, 500, 
        function(){
            $('#transcription-section').hide();
        });
    isTranscriptionMode = false;
    return false;
}

function loadFileIntoPlayer(f) {

    // make a new instance of FileReader
    var freader = new FileReader();

    freader.onload = function(e) {
        // set player source
        player.src = e.target.result;
        $('#player-label').animate({'margin-left': '0'},1000,function(){
            $('#guide').show();
            $('#guide').animate({'margin-top': '0'},500);
        });

        // showGuide();
    }

    // read file contents and execute onload code (above)
    freader.readAsDataURL(f);

    // display filename as heading
    playerLabel.innerHTML = f.name;
    bigMessage.innerHTML = 
        'Use your keyboard to control playback &mdash; see below.';

    // hide dragNDrop controls
    dragNDrop.style.display = 'none';
    chooser.style.display = 'none';

}


// ============================= bPopUp code ================================

// See page at http://dinbror.dk/blog/bPopup/

// $ is assigned to jQuery
(function($) {

     // DOM Ready
    $(function() {

        // Binding a click event
        $('#help-link').bind('click', function(e) {

            // Prevents the default action to be triggered. 
            e.preventDefault();

            // Triggering bPopup when click event is fired
            $('#help-dialog').bPopup();

        });

    });

})(jQuery);


// =========================== Player functions =============================

// The hotkeys.js plugin doesn't allow arguments in the functions that you
// bind to it, so I had to create separate functions for each time interval.

// Without the 'if (player.readyState == 4)' bits, I was getting console
// errors for referencing currentTime before the audio element was loaded.

function invert_button_colors(mode) {

    keyGroup = document.getElementsByClassName('key');
    symbolGroup = document.getElementsByClassName('symbol');

    if (mode == 2) {
        for (var i = 0, len = keyGroup.length; i < len; i++) {
            keyGroup[i].style.color = '#eee';
        }
        for (var i = 0, len = symbolGroup.length; i < len; i++) {
            symbolGroup[i].style.color = '#eee';
        }        
        loopEndButton.style.color = '#999';
        hLabel.style.color = '#ccc';
        loopLabel.style.color = '#999';
    } else if (mode == 1) {
        for (var i = 0, len = keyGroup.length; i < len; i++) {
            keyGroup[i].style.color = '#eee';
        }
        for (var i = 0, len = symbolGroup.length; i < len; i++) {
            symbolGroup[i].style.color = '#eee';
        }
        loopStartButton.style.color = '#999';
        loopEndButton.style.color = '#999';
        gLabel.style.color = '#ccc';
        hLabel.style.color = '#ccc';
        loopLabel.style.color = '#999';
    } else if (mode == 0) {
        for (var i = 0, len = keyGroup.length; i < len; i++) {
            keyGroup[i].style.color = '#ccc';
        }
        for (var i = 0, len = symbolGroup.length; i < len; i++) {
            symbolGroup[i].style.color = '#999';
        }
        loopEndButton.style.color = '#eee';
        hLabel.style.color = '#eee';
        loopLabel.style.color = '#eee';
    }

}

function change_slow_colors(mode) {
    switch (mode) {
        case 1: slowBar1.style.backgroundColor = '#999';
                slowBar2.style.backgroundColor = '#eee';
                slowBar3.style.backgroundColor = '#eee';
        break;
        case 2: slowBar1.style.backgroundColor = '#999';
                slowBar2.style.backgroundColor = '#999';
                slowBar3.style.backgroundColor = '#eee';
        break;
        case 3: slowBar1.style.backgroundColor = '#999';
                slowBar2.style.backgroundColor = '#999';
                slowBar3.style.backgroundColor = '#999';
        break;
        default:slowBar1.style.backgroundColor = '#999';
                slowBar2.style.backgroundColor = '#eee';
                slowBar3.style.backgroundColor = '#eee';
    }
}

// playback control functions
// (couldn't refactor these because js-hotkeys doesn't accept arguments for
// functions used in its keybindings)

function rewind_1() {
    if (player.readyState == 4 && loopStart == -1) { player.currentTime -= 1; }
    return false;
}

function rewind_2() {
    if (player.readyState == 4 && loopStart == -1) { player.currentTime -= 2; }
    return false;
}

function rewind_3() {
    if (player.readyState == 4 && loopStart == -1) { player.currentTime -= 3; }
    return false;
}

function rewind_4() {
    if (player.readyState == 4 && loopStart == -1) { player.currentTime -= 4; }
    return false;
}

function skip_1() {
    if (player.readyState == 4 && loopStart == -1) { player.currentTime += 1; }
    return false;
}

function skip_2() {
    if (player.readyState == 4 && loopStart == -1) { player.currentTime += 2; }
    return false;
}

function skip_3() {
    if (player.readyState == 4 && loopStart == -1) { player.currentTime += 3; }
    return false;
}

function skip_4() {
    if (player.readyState == 4 && loopStart == -1) { player.currentTime += 4; }
    return false;
}

function slower() {
    if (player.readyState == 4 && player.playbackRate >= 0.7) { 
        player.playbackRate -= 0.2; 
        slowLevel += 1;
        change_slow_colors(slowLevel);
    }
    return false;
}

function speed_reset() {
    player.playbackRate = 1; 
    slowLevel = 1;
    change_slow_colors(slowLevel);
    return false;
}

function start_recording() {
    if (player.readyState == 4) { 
        loopStart = player.currentTime;
        if (!isLooping) {
            invert_button_colors(2);
            loopText.innerHTML = 'start';
            if (isTranscriptionMode && transcriptionBox === 
                document.activeElement) {
                bigMessage.innerHTML = 
                    'Press Ctrl + H to set the end point of the loop.';
            } else {
                bigMessage.innerHTML = 
                    'Press H to set the end point of the loop.';
            }
        }
    }
    return false;
}

function stop_recording_and_loop() {
    if (player.readyState == 4 && loopStart > 0) { 
        loopEnd = player.currentTime;
        isLooping = true;
        player.currentTime = loopStart;
        invert_button_colors(1);
        bigMessage.innerHTML = 'Press ESC to cancel the loop.';
        bigMessage.style.fontWeight = '700';
    }
    return false;
}

function cancel_loop() {
    if (player.readyState == 4) {
        isLooping = false;
        loopStart = -1;
        loopEnd = -1;
        invert_button_colors(0);
        loopText.innerHTML = 'loop';
        bigMessage.innerHTML = 
        'Use your keyboard to control playback &mdash; see below.';
        bigMessage.style.fontWeight = '300';
        bigMessage.style.color = '#aaa';
    }
    return false;
}

function togglePlay() {
    if (player.readyState == 4) {
        if (player.paused) {
            player.play();
            spaceBarIcon.className = 'fa fa-pause fa-2x';
        } else {
            player.pause();
            spaceBarIcon.className = 'fa fa-play fa-2x';
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

function inc_fontSize() {
    if (fontSize < 100) {
        fontSize += 2;
        transcriptionBox.style.fontSize = fontSize + "px";
    }
}

function dec_fontSize() {
    if (fontSize > 12) {
        fontSize -= 2;
        transcriptionBox.style.fontSize = fontSize + "px";
    }
}


// ============================== Hotkeys ===================================

$(document).ready(function(){

    bindDefaultKeys();
    bindTranscriptionKeys();

    transcriptionBox.style.fontSize = fontSize + "px";
    transcriptionBox.spellcheck = false;

});


// ============================ Event listeners =============================

function changeSlowLevel() {
    switch (slowLevel) {
        case 1: slower();
        break;
        case 2: slower();
        break;
        case 3: speed_reset();
        break;
        default: speed_reset();
    }
}

function handlePlayerEnded(e) {
    player.pause();
    spaceBarIcon.className = 'fa fa-play fa-2x';
    player.currentTime = 0;
    return false;
}

function handlePlayerPause(e) {
    spaceBarIcon.className = 'fa fa-play fa-2x';
    return false;
}

function handlePlayerPlay(e) {
    spaceBarIcon.className = 'fa fa-pause fa-2x';
    return false;
}

function handlePlayerTimeUpdate(e) {
    if (isLooping && player.currentTime >= loopEnd) {
        player.currentTime = loopStart;
    }
    $("#debug").text("player.buffered.end(0) = " + player.buffered.end(0));
}

// switch between normal controls screen and transcription screen
function switchModes() {
    if (isTranscriptionMode) {
        $('#transcription-section').animate({'margin-top': '1000px'}, 500, 
            function(){
                $('#transcription-section').hide(showGuide());
            });
        isTranscriptionMode = false;
    } else {
        $('#guide').animate({'margin-top': '1000px'}, 500, function(){
            $('#guide').hide(
                showTranscriptionSection()
            );
        });
    }
    return false;
}

// listeners for dragNDrop
dragNDrop.addEventListener('dragover', handleDragOver, false);
dragNDrop.addEventListener('dragleave', handleDragLeave, false);
dragNDrop.addEventListener('drop', handleDrop, false);

// listener for chooser
chooser.addEventListener('change', handleChooser, false);

// listener for spacebar icon
spacebar.addEventListener('click', togglePlay, false); 

// listeners for rewind/skip buttons
back4.addEventListener('click', rewind_4, false); 
back3.addEventListener('click', rewind_3, false); 
back2.addEventListener('click', rewind_2, false); 
back1.addEventListener('click', rewind_1, false); 
forward4.addEventListener('click', skip_4, false); 
forward3.addEventListener('click', skip_3, false); 
forward2.addEventListener('click', skip_2, false); 
forward1.addEventListener('click', skip_1, false); 

// listeners for loop buttons
loopStartButton.addEventListener('click', start_recording, false); 
loopEndButton.addEventListener('click', stop_recording_and_loop, false); 

// listener for slow button
slow.addEventListener('click', changeSlowLevel, false); 

// listeners for audio element
player.addEventListener('ended', handlePlayerEnded, false);
player.addEventListener('pause', handlePlayerPause, false);
player.addEventListener('play', handlePlayerPlay, false);

// check currentTime every 250ms and jump to start of loop if reached end
player.addEventListener('timeupdate', handlePlayerTimeUpdate, false);

// listeners for transcribe button
transcribeButton.addEventListener('click', switchModes, false);
stopTranscribeButton.addEventListener('click', switchModes, false);


} // end of huge else statement



