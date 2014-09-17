function bindDefaultKeys() {

  // perform full unbind:
  // $(document).unbind('keydown');

  // numbers
  $(document).bind('keydown', '1', rewind_1);
  $(document).bind('keydown', '2', rewind_2);
  $(document).bind('keydown', '3', rewind_3);
  $(document).bind('keydown', '4', rewind_4);

  // home row
  $(document).bind('keydown', 'g', start_recording);
  $(document).bind('keydown', 'f', rewind_1);
  $(document).bind('keydown', 'd', rewind_2);
  $(document).bind('keydown', 's', rewind_3);
  $(document).bind('keydown', 'a', rewind_4);

  $(document).bind('keydown', 'h', stop_recording_and_loop);
  $(document).bind('keydown', 'j', skip_1);
  $(document).bind('keydown', 'k', skip_2);
  $(document).bind('keydown', 'l', skip_3);
  $(document).bind('keydown', ';', skip_4);
  
  $(document).bind('keydown', 'G', start_recording);
  $(document).bind('keydown', 'F', rewind_1);
  $(document).bind('keydown', 'D', rewind_2);
  $(document).bind('keydown', 'S', rewind_3);
  $(document).bind('keydown', 'A', rewind_4);

  $(document).bind('keydown', 'H', stop_recording_and_loop);
  $(document).bind('keydown', 'J', skip_1);
  $(document).bind('keydown', 'K', skip_2);
  $(document).bind('keydown', 'L', skip_3);

  // arrow keys
  $(document).bind('keydown', 'left', rewind_2);
  $(document).bind('keydown', 'right', skip_2);
  $(document).bind('keydown', 'up', inc_volume);
  $(document).bind('keydown', 'down', dec_volume);
  $(document).bind('keydown', 'space', togglePlay);

  // misc
  $(document).bind('keydown', 'comma', speed_reset);
  $(document).bind('keydown', 'period', slower);
  $(document).bind('keydown', 'esc', function(e){
    e.preventDefault();
    cancel_loop();
    return false;
  });

  return false;
}

function bindTranscriptionKeys() {

  // perform full unbind:
  // $(document).unbind('keypress');  

  // numbers
  $('#transcription-box').bind('keydown', 'ctrl+1', function(e){
    e.preventDefault();
    rewind_1();
    return false;
  });
  $('#transcription-box').bind('keydown', 'ctrl+2', function(e){
    e.preventDefault();
    rewind_2();
    return false;
  });
  $('#transcription-box').bind('keydown', 'ctrl+3', function(e){
    e.preventDefault();
    rewind_3();
    return false;
  });
  $('#transcription-box').bind('keydown', 'ctrl+4', function(e){
    e.preventDefault();
    rewind_4();
    return false;
  });

  // home row
  $('#transcription-box').bind('keydown', 'ctrl+g', function(e){
    e.preventDefault();
    start_recording();
    return false;
  });
  $('#transcription-box').bind('keydown', 'ctrl+f', function(e){
    e.preventDefault();
    rewind_1();
    return false;
  });
  $('#transcription-box').bind('keydown', 'ctrl+d', function(e){
    e.preventDefault();
    rewind_2();
    return false;
  });
  $('#transcription-box').bind('keydown', 'ctrl+s', function(e){
    e.preventDefault();
    rewind_3();
    return false;
  });
  $('#transcription-box').bind('keydown', 'ctrl+a', function(e){
    e.preventDefault();
    rewind_4();
    return false;
  });

  $('#transcription-box').bind('keydown', 'ctrl+h', function(e){
    e.preventDefault();
    stop_recording_and_loop();
    return false;
  });
  $('#transcription-box').bind('keydown', 'ctrl+j', function(e){
    e.preventDefault();
    skip_1();
    return false;
  });
  $('#transcription-box').bind('keydown', 'ctrl+k', function(e){
    e.preventDefault();
    skip_2();
    return false;
  });
  $('#transcription-box').bind('keydown', 'ctrl+l', function(e){
    e.preventDefault();
    skip_3();
    return false;
  });
  $('#transcription-box').bind('keydown', 'ctrl+;', function(e){
    e.preventDefault();
    skip_4();
    return false;
  });
  $('#transcription-box').bind('keydown', 'ctrl+space', function(e){
    e.preventDefault();
    togglePlay();
    return false;
  });

  // arrow keys (not used because interferes with Spaces on OS X)
  // $('#transcription-box').bind('keydown', 'ctrl+left', rewind_2);
  // $('#transcription-box').bind('keydown', 'ctrl+right', skip_2);
  // $('#transcription-box').bind('keydown', 'ctrl+up', inc_volume);
  // $('#transcription-box').bind('keydown', 'ctrl+down', dec_volume);

  // misc
  $('#transcription-box').bind('keydown', 'ctrl+comma', function(e){
    e.preventDefault();
    speed_reset();
    return false;
  });
  $('#transcription-box').bind('keydown', 'ctrl+period', function(e){
    e.preventDefault();
    slower();
    return false;
  });
  $('#transcription-box').bind('keydown', 'esc', function(e){
    e.preventDefault();
    cancel_loop();
    return false;
  });

  // only for transcription box
  $('#transcription-box').bind('keydown', 'ctrl+=', function(e){
    e.preventDefault();
    inc_fontSize();
    return false;
  });
  $('#transcription-box').bind('keydown', 'ctrl+-', function(e){
    e.preventDefault();
    dec_fontSize();
    return false;
  });

  return false;

}





