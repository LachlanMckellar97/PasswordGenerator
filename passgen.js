// DOM elements 
var passwordEl = document.getElementById("password");
var passlengthEl = document.getElementById("passlength");
var includeLowerEl = document.getElementById("includeLower");
var includeUpperEl = document.getElementById("includeUpper");
var includeNumberEl = document.getElementById("includeNumber");
var includeSymbolEl = document.getElementById("includeSymbol");
var generateButtonEl = document.getElementById("generateButton");
var copybuttonEl = document.getElementById("copybutton");

var randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

//Copy password
copybuttonEl.addEventListener("click", () => {
    var textarea = document.createElement("textarea");
    var password = passwordEl.innerText;

    if(!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Password copied to clipboard.")
})

//Generator event listener
generateButtonEl.addEventListener("click", () =>{
    var length = +passlengthEl.value;
    var hasLower = includeLowerEl.checked;
    var hasUpper = includeUpperEl.checked;
    var hasNumber = includeNumberEl.checked;
    var hasSymbol = includeSymbolEl.checked;

    passwordEl.innerText = generatePassword(
        hasLower,
        hasUpper, 
        hasNumber, 
        hasSymbol, 
        length
    );
})

//Generate Password
function generatePassword(lower, upper, number, symbol, length) {
  
    var generatedPassword = "";

    var typesCount = lower + upper + number + symbol;

    var typesArr = [{lower}, {upper}, {number}, {symbol}].filter
    (item => Object.values(item)[0]);

    if(typesCount === 0) {
        alert("Please select at least one character type");
        return " ";
    }

    else if(length > 128 || length < 8) {
        alert("Please select a number from 8 to 128");
        return " ";
    }
    
    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
           var funcName = Object.keys(type)[0];
           generatedPassword += randomFunc[funcName]();
        })
    }

    var finalPassword = (shuffle(generatedPassword.slice(0, length)));

    return finalPassword;
}

//Generator functions

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
	var symbols = " !#$%&'()*+,-./:;<=>?@[\]^_`{|}~"
	return symbols[Math.floor(Math.random() * symbols.length)];
}

//shuffle
function shuffle(string) {
    var parts = string.split('');
    for (var i = parts.length; i > 0;) {
        var random = parseInt(Math.random() * i);
        var temp = parts[--i];
        parts[i] = parts[random];
        parts[random] = temp;
    }
    return parts.join('');
}