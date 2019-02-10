var squareBtn = document.getElementById('square'),
    triFuns = document.getElementsByClassName("triFun"),
    sqrtBtn = document.getElementsByClassName('sqrt')[0],
    degreeMode = document.querySelector('.triMode'),
    equalBtn = document.querySelector('button[disabled]'),
    pointBtn = document.querySelector('#point'),
    equation = document.querySelector("#result p"),
    result = document.querySelectorAll("#result p")[1],
    operations = document.querySelectorAll(".Operators button"),
    numbers = Array.from(document.querySelectorAll('.Numbers button')),
    eqn = '', showResult = false, angle, op;


function disablBtn(bool) {
    for(var i=0 ; i<triFuns.length ; i++){
        triFuns[i].disabled = bool
    }
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
        var cnt = 0
        for (var i = index - 1; i >= 0; i--) {
            if(eqn[i] === ')') cnt++;
            if(eqn[i] === '(') cnt--
            if (eqn[i] === '(' && !cnt) {
                y = eqn.slice(i + 1, eqn.indexOf('</sup>') + 6)
                z = 'Math.pow' + eqn.slice(i, index-1) + ', 2))'
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
    result.innerHTML += number
    disablBtn(false);
    // To avoid two points in number
    if (number === '.') pointBtn.disabled = true
}

for (var i = 0; i < numbers.length - 1; i++) {
    numbers[i].addEventListener('click', function () {
        clkNumbers(this.innerText)
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
        else if (equation.innerHTML.slice(-3) === 'Mod') equation.innerHTML = equation.innerHTML.slice(0, -3) + op
        else equation.innerHTML = '0' + op
    }
    else if (result.innerHTML !== 'Infinity') {
        if (showResult) {
            equation.textContent = ''
            eqn = ''
            showResult = false
        }
        var lastChar = equation.innerText.slice(-1)
        if(showResult || lastChar === '') equation.innerHTML = result.innerHTML+op
        else equation.innerHTML += result.innerHTML + op
        if (op === 'Mod') eqn += result.innerHTML + '%'
        else eqn += result.innerHTML + op
        result.innerHTML = ""
        disablBtn(true)
        equalBtn.disabled = true
        pointBtn.disabled = false
        for (var i = 0; i < numbers.length - 1; i++) numbers[i].disabled = false
    }
}

for (var i = 0; i < operations.length; i++) {
    operations[i].addEventListener('click', function () {
        clkOperation(this.textContent)
    })
}

document.querySelector('.mod').addEventListener('click', function () {
    clkOperation('Mod')
})

// Trignometric functions buttons
for (var i = 0; i < triFuns.length; i++) {
    triFuns[i].addEventListener('click', function () {
        if (result.innerHTML !== 'Infinity') {
            result.innerHTML = this.innerText + '(' + result.innerHTML + ')'
            if (showResult) eqn = ''
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
        if(showResult) eqn = ''
        for (var i = 0; i < numbers.length - 1; i++) numbers[i].disabled = true
        equalBtn.disabled = false
        showResult = false;
    }
})

// Square button
squareBtn.addEventListener('click', function () {
    if (result.innerHTML !== 'Infinity') {
        result.innerHTML = '(' + result.innerHTML + ')<sup>2</sup>'
        if(showResult) eqn =  ''
        for (var i = 0; i < numbers.length - 1; i++) numbers[i].disabled = true
        equalBtn.disabled = false
        showResult = ''
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
        for (var i = 0; i < numbers.length - 1; i++) numbers[i].disabled = false
    }
})

// Degree / Radian button
degreeMode.addEventListener('click', function () {
    if (this.innerHTML === 'Deg') this.innerHTML = 'Rad'
    else this.innerHTML = 'Deg'
})