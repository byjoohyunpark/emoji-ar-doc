const DEBUG_MODE = "FALSE";

var divs = [];
var counter = 0;
var maxDivs = 300;
var bodyH, bodyW, lingo;

let words = ["✌", "😂", "😝", "😁", "😱", "👉", "🙌", "🍻", "🔥", "🌈", "☀", "🎈", "🌹", "💄", "🎀", "⚽", "🎾", "🏁", "😡", "👿", "🐻", "🐶", "🐬", "🐟", "🍀", "👀", "🚗", "🍎", "💝", "💙", "👌", "❤", "😍", "😉", "😓", "😳", "💪", "💩", "🍸", "🔑", "💖", "🌟", "🎉", "🌺", "🎶", "👠", "🏈", "⚾", "🏆", "👽", "💀", "🐵", "🐮", "🐩", "🐎", "💣", "👃", "👂", "🍓", "💘", "💜", "👊", "💋", "😘", "😜", "😵", "🙏", "👋", "🚽", "💃", "💎", "🚀", "🌙", "🎁", "⛄", "🌊", "⛵", "🏀", "🎱", "💰", "👶", "👸", "🐰", "🐷", "🐍", "🐫", "🔫", "👄", "🚲", "🍉", "💛", "💚"];


//initially load n amount of particles
for (i = 0; i < maxDivs / 3; i++) {
    newLingo();
}

//add additional particles on a set interval with initial delay
setTimeout(function () {
    setInterval(newLingo, 25);
}, 750);

function newLingo() {
    var buffer = 0; //as in margins
    bodyW = document.body.clientWidth;
    bodyH = document.body.clientHeight;

    counter++;
    lingo = getRandomValue(words);

    //convert less than symbol to HTML compliant
    var lthan = "<";
    var regi = new RegExp(lthan, 'g');
    lingo = lingo.replace(regi, '&lt;');

    //dynamically add div
    var div = document.createElement('div');
    div.id = 'div' + counter;
    div.classList.add('lingo');
    div.style.left = getRandomInt(buffer, (bodyW - div.style.width) - buffer) + 'px';
    div.style.top = getRandomInt(buffer, (bodyH - div.style.height) - buffer) + 'px';
    div.innerHTML = lingo;

    //set CSS animation properties
    div.style.setProperty('--init-x', div.style.left + 'px');
    div.style.setProperty('--init-y', div.style.top + 'px');
    var _destZ = getRandomInt(100, 600);

    var quad = getQuandrantForElem(div);
    if (quad === 1) {
        div.style.setProperty('--dest-x', -50 + '%');
        div.style.setProperty('--dest-y', -50 + '%');
        div.style.setProperty('--dest-z', _destZ + 'px');
    }
    if (quad === 2) {
        div.style.setProperty('--dest-x', 50 + '%');
        div.style.setProperty('--dest-y', -50 + '%');
        div.style.setProperty('--dest-z', _destZ + 'px');
    }
    if (quad === 3) {
        div.style.setProperty('--dest-x', -50 + '%');
        div.style.setProperty('--dest-y', 50 + '%');
        div.style.setProperty('--dest-z', _destZ + 'px');
    }
    if (quad === 4) {
        div.style.setProperty('--dest-x', 50 + '%');
        div.style.setProperty('--dest-y', 50 + '%');
        div.style.setProperty('--dest-z', _destZ + 'px');
    }

    //add the div to the document and divs array
    document.querySelector(".field").appendChild(div);
    divs.push(div.id);
    if (divs.length > maxDivs) {
        var elem = document.getElementById(divs[0]);
        elem.parentNode.removeChild(elem);
        divs.shift();
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomValue(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// This should be refined and improved for accuracy.
function getQuandrantForElem(elem) {
    var result = 0;
    var divDim = {
        'X': elem.style.left.slice(0, -2),
        'Y': elem.style.top.slice(0, -2)
    };
    var buffer = 50;

    if (divDim.X >= (bodyW / 2) - buffer) {
        if (divDim.Y >= (bodyH / 2)) {
            result = 4;
        }
        if (divDim.Y <= (bodyH / 2)) {
            result = 2;
        }
    }

    if (divDim.X <= (bodyW / 2) - buffer) {
        if (divDim.Y >= (bodyH / 2)) {
            result = 3;
        }
        if (divDim.Y <= (bodyH / 2)) {
            result = 1;
        }
    }

    return result;
}
