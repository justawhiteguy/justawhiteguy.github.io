$(document).ready(function() {
  var histDisp = '';
  var histCalc = '';
  var current = '0';
  var input = '';
  var result = '';
  var hist = 0;
  var functionExecuted = false;
  var reset = false;

  function truncHistory(inp) {
    if(inp.length < 35) {
      return inp;
    } else {
      return '...' + inp.slice(inp.indexOf(' '),inp.length - 1);
    }
  }

  function zero() {
    if(!functionExecuted) {
      if(current === '' || current.length === 0) {
        current = input;
      } else if(current === '0') {
        current = input;
      } else {
        if(current.length < 16) {
          current += 0;
        }
      }
      $('#value').html(current);
    } else {
      clear();
      functionExecuted = false;
    }
  }

  function number() {
    if(!functionExecuted) {
      if(current == '0') {
        current = input;
      } else {
        if(current.length < 16)  {
          current += input;
        }
      }
      $('#value').html(current);
    } else {
      clear();
      if(current == '0') {
        current = input;
      } else {
        if(current.length < 16) {
          current += input;
        }
      }
      $('#value').html(current);
      functionExecuted = false;
    }
  }

  function mc() {
    hist = 0;
    $('#memory').html('');
  }

  function mr() {
    current = hist;
    $('#value').html(current);
  }

  function ms() {
    if(!isNaN(current)) {
      hist = current===''?result:current;
      // display memory saved
      if(hist == '0') {
        $('#memory').html('');
      } else {
        $('#memory').html('M');
      }
    }
  }

  function mPlus() {
    if(!isNaN(current)) {
      hist += current===''?Number(result):Number(current);
    }
    // display / hide memory saved
    if(hist == '0') {
      $('#memory').html('');
    } else {
      $('#memory').html('M');
    }
  }

  function mMinus() {
    if(!isNaN(current)) {
      hist -= current===''?Number(result):Number(current);
      // display / hide memory saved
      if(hist == '0') {
        $('#memory').html('');
      } else {
        $('#memory').html('M');
      }
    }
  }

  function backspace() {
    if(!functionExecuted) {
      current = current.slice(0,current.length - 1);
      if(current.length === 0 || current == '0' || current == '-') {
        current = '0';
      }
      $('#value').html(current);
    }
  }

  function ce() {
    input = '';
    current = '0'
    $('#value').html(current);
  }

  function clear() {
    result = '';
    histDisp = '';
    histCalc = '';
    current = '0';
    $('#history').html(truncHistory(histDisp));
    $('#value').html(current);
  }

  function negate() {
    if(current == '0' || current.length === 0) {
      current = '0';
      $('#value').html(current);
    } else {
      if(current.indexOf('-') == -1) {
        current = '-' + current;
        $('#value').html(current);
      } else {
        current = current.slice(1);
        $('#value').html(current);
      }
    }
  }

  function sqrt() {
    if(current === '') {
      current = 0;
    }
    if(Number(current) < 0) {
      $('#value').html('Invalid Input');
      current = '';
      histDisp = '';
      histCalc = '';
      result = '';
      console.log(current + ' ' + histDisp + ' ' + histCalc);
    } else {
      histDisp += 'sqrt(' + current + ')'
      $('#history').html(truncHistory(histDisp));
      current = Math.sqrt(current).toString();
      $('#value').html(current);
    }
    functionExecuted = true;
  }

  function divide() {
    if(current !== '') {
      result = eval(histCalc + current);
      histDisp += !functionExecuted?current + ' &divide; ':' &divide; ';
      histCalc += current + ' / ';
      $('#history').html(truncHistory(histDisp));
      $('#value').html(result);
      current = '';
      functionExecuted = false;
    } else {

    }
  }

  function percent() {
    current /= 100;
    $('#value').html(current);
    functionExecuted = true;
  }

  function multiply() {
    if(current !== '') {
      result = eval(histCalc + current);
      histDisp += !functionExecuted?current + ' &times; ':' &times; ';
      histCalc += current + ' * ';
      $('#history').html(truncHistory(histDisp));
      $('#value').html(result);
      current = '';
      functionExecuted = false
    }
  }

  function reciproc() {
    current = 1/current;
    $('#value').html(current);
    functionExecuted = true;
  }

  function subtract() {
    if(current !== '') {
      result = eval(histCalc + current);
      histDisp += !functionExecuted?current + ' - ':' - ';
      histCalc += current + ' - ';
      $('#history').html(truncHistory(histDisp));
      $('#value').html(result);
      current = '';
      functionExecuted = false
    }
  }

  function addition() {
    if(current !== '') {
      result = eval(histCalc + current);
      histDisp += !functionExecuted?current + ' + ':' + ';
      histCalc += current + ' + ';
      $('#history').html(truncHistory(histDisp));
      $('#value').html(result);
      current = '';
      functionExecuted = false
    }
  }

  function equals() {
    if(current !== '') {
      result = eval(histCalc + current);
      histDisp = '';
      histCalc = '';
      $('#history').html(truncHistory(histDisp));
      $('#value').html(result);
      current = '';
    } else {
      histDisp = '';
      histCalc = '';
      $('#history').html(truncHistory(histDisp));
      $('#value').html(result);
    }
  }

  function decimal(inp) {
    if(current.indexOf('.') !== -1) {
      input = '';
    }
    if(current === '') {
      input = '0.'
    }
    current += input;
    $('#value').html(current);
  }

  $(".key").click(function() {
    input = $(this).attr('value');
    if(!isNaN(input) || input === '.') {
      if(input === '.') {
        decimal();
      } else if(input === '0') {
        zero();
      } else {
        number();
      }
      // $('#value').html(current);
    } else {
      if(input == 'add') {
        addition();
      } else if(input == 'sub') {
        subtract();
      } else if(input == 'mult') {
        multiply();
      } else if(input == 'div') {
        divide();
      } else if(input == 'eq') {
        equals();
      } else if(input == 'C') {
        clear();
      } else if(input == 'CE') {
        ce();
      } else if(input == 'pm') {
        negate();
      } else if(input == 'del') {
        backspace();
      } else if(input == 'sqrt') {
        sqrt();
      } else if(input == 'MC') {
        mc();
      } else if(input == 'MR') {
        mr();
      } else if(input == 'MS') {
        ms();
      } else if(input == 'M+') {
        mPlus();
      } else if(input == 'M-') {
        mMinus();
      } else if(input == '%') {
        percent();
      } else if(input == 'inv') {
        reciproc();
      }
    }
  });
});
