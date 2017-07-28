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
        var clean = inp.replace(/&times;/g, "x").replace(/&divide;/, "/");
        console.log(clean.length);
        if(clean.length < 41) {
            return inp;
        } else {
            /* TODO: Figure out how to prevent history from slipping to next line */
            //return '...' + (inp.split(" ")).slice(inp.indexOf(' '),inp.length - 1).join();
            var trunc = clean.slice(-37);
            return '...' + trunc.slice(trunc.indexOf(' ')).replace(/x/g, "&times;").replace(/\//g, "&divide;");
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
                if(current.length < 16)    {
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
            switch(input) {
                case 'add':
                    addition();
                    break;
                case 'sub':
                    subtract();
                    break;
                case 'mult':
                    multiply();
                    break;
                case 'div':
                    divide();
                    break;
                case 'eq':
                    equals();
                    break;
                case 'C':
                    clear();
                    break;
                case 'CE':
                    ce();
                    break;
                case 'pm':
                    negate();
                    break;
                case 'del':
                    backspace();
                    break;
                case 'sqrt':
                    sqrt();
                    break;
                case 'MC':
                    mc();
                    break;
                case 'MR':
                    mr();
                    break;
                case 'MS':
                    ms();
                    break;
                case 'M+':
                    mPlus();
                    break;
                case 'M-':
                    mMinus();
                    break;
                case '%':
                    percent();
                    break;
                case 'inv':
                    reciproc();
                    break;
            }
        }
    });
});
