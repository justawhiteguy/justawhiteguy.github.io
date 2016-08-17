var nIntervId;
var start = false;
var sessionLength = 25;
var sessionTime = sessionLength * 60;
var breakLength = 5;
var breakTime = breakLength * 60;
var min, sec;

function toggleTimer() {
  if(!start) {
    console.log('start');
    document.getElementById('settings').style.pointerEvents = 'none';
    nIntervId = setInterval(countdown,1000);
    start = true;
  } else {
    console.log('pause');
    clearInterval(nIntervId);
    document.getElementById('settings').style.pointerEvents = 'auto';
    start = false;
    $('#timer-title').stop();
  }
  displayPomodoro();
}

function formatTime(time) {
  min = Math.floor(time/60);
  sec = time % 60;
  $("#timer").html(min + ":" + (sec < 10 ? '0'+sec : sec));
}

function countdown() {
  if(sessionTime < 0) {
    if(breakTime === 0) {
      sessionTime = sessionLength;
      breakTime = breakLength;
      formatTime(sessionTime);
      displayPomodoro();
    } else {
      breakTime -= 1;
      formatTime(breakTime);
    }
  } else {
    sessionTime -= 1;
    if(sessionTime < 0) {
      displayPomodoro();
      formatTime(breakTime);
    } else {
      formatTime(sessionTime);
    }
  }
}

function displayPomodoro() {
  if(sessionTime > 0 && !start) {
    $('#timer-title').html('Get to Work!');
    $('#timer-title').css('font-size','2em');
    $('#timer-title').css('color','white');
  } else if (sessionTime > 0) {
    $('#timer-title').html('Working...');
    $('#timer-title').css('font-size','3em');
    $('#timer-title').css('color','red');
  } else {
    $('#timer-title').html('Break Time!');
    $('#timer-title').css('font-size','2em');
    $('#timer-title').css('color','white');
  }
}

function changeBreak() {
  $('#bminus').click(function() {
    if(breakLength > 1) {
      breakLength -= 1;
      $('#btime').html(breakLength);
    }
  });
  $('#bplus').click(function() {
    if(breakLength < 59) {
      breakLength += 1;
      $('#btime').html(breakLength);
    }
  });
}

function changeSession() {
  $('#sminus').click(function() {
    if(sessionLength > 1) {
      sessionLength -= 1;
      sessionTime = sessionLength * 60;
      $('#stime').html(sessionLength);
      formatTime(sessionTime);
    }
  });
  $('#splus').click(function() {
    if(sessionLength < 59) {
      sessionLength += 1;
      sessionTime = sessionLength * 60;
      $('#stime').html(sessionLength);
      formatTime(sessionTime);
    }
  });
}

function reset() {
  clearInterval(nIntervId);
  sessionTime = sessionLength * 60;
  breakTime = breakLength * 60;
  formatTime(sessionTime);
  start = false;
  displayPomodoro();
}

function pomodoro() {
  formatTime(sessionTime);
  $('#btime').html(breakLength);
  $('#stime').html(sessionLength);
  $('#timer').click(toggleTimer);
  $('#reset').click(reset);
  changeBreak();
  changeSession();
  displayPomodoro();
}

$(document).ready(pomodoro);
