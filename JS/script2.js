var equation = document.querySelectorAll("#result p")[0],
    result = document.querySelectorAll("#result p")[1],
    numbers = Array.from(document.querySelectorAll('.Numbers button')),
    operations = Array.from(document.querySelectorAll(".Operators button")),
    triFuns = Array.from(document.getElementsByClassName("triFun")),
    degreeMode = document.querySelector('.triMode'),
    sqrtBtn = document.getElementsByClassName('sqrt')[0],
    squareBtn = document.getElementById('square'),
    equalBtn = document.querySelector('button[disabled]'),
    pointBtn = document.querySelector('#point'),
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
        eqn = eqn.replace(/sin\(/g, 'Math.sin(Math.PI/180*')
            .replace(/cos\(/g, 'Math.cos(Math.PI/180*')
            .replace(/tan\(/g, 'Math.tan(Math.PI/180*')
            .replace(/√/g, 'Math.sqrt')
    } else {
        eqn = eqn.replace(/sin/g, 'Math.sin')
            .replace(/cos/g, 'Math.cos')
            .replace(/tan/g, 'Math.tan')
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
            if (isNaN(eqn[i]) && eqn[i] !== ')') {
                y = eqn.slice(i + 1, eqn.indexOf('</sup>') + 6)
                z = 'Math.pow(' + eqn.slice(i + 1, index) + ', 2)'
                eqn = eqn.replace(y, z)
                break;
            }
        }
    }
}

disablBtn(true)

// Numbers buttons
function clkNumbers(number) {
    equalBtn.disabled = false
    if (showResult) clear()
    disablBtn(false);
    result.innerHTML += number
    // To avoid two points in number
    if (number === '.' && point === false) {
        point = true;
        pointBtn.disabled = true
    }
}

for (var i = 0; i < numbers.length - 1; i++) {
    var number = numbers[i]
    number.addEventListener('click', function () {
        clkNumbers(this.innerHTML)
    })
}

// AC button
numbers.slice(-1)[0].addEventListener('click', clear)

// Operations buttons
function clkOperation(op) {
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
        if (op === 'Mod') eqn += result.innerHTML + '%'
        else eqn += result.innerHTML + op
        result.innerHTML = ""
        disablBtn(true)
        equalBtn.disabled = true
        pointBtn.disabled = false
        point = false
        for (var i = 0; i < numbers.length - 1; i++) numbers[i].disabled = false
    }
}

for (var i = 0; i < operations.length; i++) {
    var operation = operations[i]
    operation.addEventListener('click', function () {
        clkOperation(this.textContent)
    })
}

document.querySelector('.mod').addEventListener('click', function () {
    clkOperation('Mod')
})

// Trignometric functions buttons
for (var i = 0; i < triFuns.length; i++) {
    var element = triFuns[i];
    element.addEventListener('click', function () {
        if (result.innerHTML !== 'Infinity') {
            if (showResult) eqn = ''
            result.innerHTML = this.innerHTML + '(' + result.innerHTML + ')'
            for (var i = 0; i < numbers.length - 1; i++) numbers[i].disabled = true
            equalBtn.disabled = false
            showResult = false
        }
    })
}

// Square root button
sqrtBtn.addEventListener('click', function () {
    if (result.innerHTML !== 'Infinity') {
        result.innerHTML = '&radic;(' + result.innerHTML + ')'
        for (var i = 0; i < numbers.length - 1; i++) numbers[i].disabled = true
        equalBtn.disabled = false
    }
})

// Square button
squareBtn.addEventListener('click', function () {
    if (result.innerHTML !== 'Infinity') {
        result.innerHTML = result.innerHTML + '<sup>2</sup>'
        for (var i = 0; i < numbers.length - 1; i++) numbers[i].disabled = true
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
    }
})

// Degree / Radian button
degreeMode.addEventListener('click', function () {
    if (this.innerHTML === 'Deg') this.innerHTML = 'Rad'
    else this.innerHTML = 'Deg'
})

// Keyboard event
document.addEventListener('keypress', function (evt) {
    if (evt.keyCode >= 48 && evt.keyCode <= 59) {
        clkNumbers(evt.key)
    }
})