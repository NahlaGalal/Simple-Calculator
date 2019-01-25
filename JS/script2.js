var equation = document.querySelectorAll("#result p")[0],
    result = document.querySelectorAll("#result p")[1],
    numbers = Array.from(document.querySelectorAll('.Numbers button')),
    operations = Array.from(document.querySelectorAll(".Operators button")),
    triFuns = Array.from(document.getElementsByClassName("triFun")),
    degreeMode = document.querySelector('.triMode'),
    sqrtBtn = document.getElementsByClassName('sqrt')[0],
    squareBtn = document.querySelector('.square'),
    equalBtn = document.querySelector('button.equal'),
    pointBtn = document.querySelector('.point'),
    eqn = '', point = false, showResult = false, angle, op;


function disablBtn(bool) {
    triFuns.forEach(element => {
        element.disabled = bool
    });
    squareBtn.disabled = bool
    sqrtBtn.disabled = bool
}

function clear() {
    result.textContent = "";
    equation.textContent = "";
    eqn = '';
    disablBtn(true)
    equalBtn.disabled = true;
    pointBtn.disabled = false;
    point = false;
    showResult = false;
    numbers.forEach(number => number.disabled = false)
}

function analyzeEqn() {
    if (degreeMode.innerHTML === 'Deg') {
        eqn = eqn.replace(/Sin\(/g, 'Math.sin(Math.PI/180*')
            .replace(/Cos\(/g, 'Math.cos(Math.PI/180*')
            .replace(/Tan\(/g, 'Math.tan(Math.PI/180*')
            .replace(/√/g, 'Math.sqrt')
    } else {
        eqn = eqn.replace(/Sin/g, 'Math.sin')
            .replace(/Cos/g, 'Math.cos')
            .replace(/Tan/g, 'Math.tan')
            .replace(/√/g, 'Math.sqrt')
    }
    while (eqn.indexOf('<s') !== -1) {
        var index = eqn.indexOf('<s')
        for (var i = index - 1; i >= 0; i--) {
            if (i <= 0) {
                y = eqn.slice(i, eqn.indexOf('</sup>') + 6)
                z = 'Math.pow(' + eqn.slice(i, index) + ', 2)'
                eqn = eqn.replace(y, z)
                break;
            }
            if (isNaN(eqn[i] && eqn[i] !== ')')) {
                y = eqn.slice(i + 1, eqn.indexOf('</sup>') + 6)
                z = 'Math.pow(' + eqn.slice(i + 1, index) + ', 2)'
                eqn = eqn.replace(y, z)
                break;
            }
        }
    }
}

disablBtn(true)
equalBtn.disabled = true

// Numbers buttons
function clkNumbers(number) {
    equalBtn.disabled = false
    if (showResult) clear()
    disablBtn(false);
    result.innerHTML += number
    // To avoid two points in number
    if (number === '.' && point === false) {
        point = true;
        number.disabled = true
    }
}

numbers.forEach(number => {
    number.addEventListener('click', function(){
        clkNumbers(this.innerHTML)
    })
});

// AC button
document.querySelector(".clear").addEventListener("click", clear)

// Operations buttons
operations.forEach(operation => {
    operation.addEventListener('click', function () {
        op = this.textContent;
        if (result.innerHTML === '') {
            if (equation.innerHTML.slice(-1) === '+'
                || equation.innerHTML.slice(-1) === '-'
                || equation.innerHTML.slice(-1) === '*'
                || equation.innerHTML.slice(-1) === '/') {
                equation.innerHTML = equation.innerHTML.slice(0, -1) + op
            }
            else if (equation.innerHTML.slice(-3) === 'Mod') {
                equation.innerHTML = equation.innerHTML.slice(0, -3) + op
            } else {
                equation.innerHTML = '0' + op
            }
        }
        else if (result.innerHTML !== 'Infinity') {
            if (showResult) {
                equation.textContent = ''
                eqn = ''
                showResult = false
            }
            equation.innerHTML += result.innerHTML + op
            if (operation.innerHTML === 'Mod') eqn += result.innerHTML + '%'
            else eqn += result.innerHTML + op
            result.innerHTML = ""
            disablBtn(true)
            equalBtn.disabled = true
            pointBtn.disabled = false
            point = false
            numbers.forEach(number => number.disabled = false)
        }
    })
});

// Trignometric functions buttons
triFuns.forEach(element => {
    element.addEventListener('click', function () {
        if (result.innerHTML !== 'Infinity') {
            if (showResult) eqn = ''
            result.innerHTML = this.innerHTML + '(' + result.innerHTML + ')'
            numbers.forEach(number => number.disabled = true)
            equalBtn.disabled = false
            showResult = false
        }
    })
});

// Square root button
sqrtBtn.addEventListener('click', function () {
    if (result.innerHTML !== 'Infinity') {
        result.innerHTML = '&radic;(' + result.innerHTML + ')'
        numbers.forEach(number => number.disabled = true)
        equalBtn.disabled = false
    }
})

// Square button
squareBtn.addEventListener('click', function () {
    if (result.innerHTML !== 'Infinity') {
        result.innerHTML = result.innerHTML + '<sup>2</sup>'
        numbers.forEach(number => number.disabled = true)
        equalBtn.disabled = false
    }
})

// Equal button
equalBtn.addEventListener('click', function () {
    if (!showResult) {
        equation.innerHTML += result.innerHTML
        eqn += result.innerHTML
        analyzeEqn()
        result.innerHTML = Math.round(eval(eqn) * 100000) / 100000
        if (result.innerHTML.length > 10) result.innerHTML = 'Infinity'
        showResult = true;
        numbers.forEach(number => number.disabled = false)
    }
})

// Degree / Radian button
degreeMode.addEventListener('click', function () {
    if (this.innerHTML === 'Deg') this.innerHTML = 'Rad'
    else this.innerHTML = 'Deg'
})

// Keyboard event
document.addEventListener('keypress', function(evt){
    if(evt.keyCode >= 48 && evt.keyCode <= 59){
        clkNumbers(evt.key)
    }
})