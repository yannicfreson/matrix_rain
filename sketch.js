var streams = [];
var fadeInterval = 2;
var symbolSize = 20;
var opacity = 0;
var message = "Lorem Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
var messageAsArray = message.split('');
var displayedMessage = "";
var currentCharToType = 0;
var letterSize = 14;
var hasStarted = false;
var hasDrawnMessageBox = false;
var finished = false;

function setup() {
  console.log(message.length);
  frameRate(60);
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  background(0);

  var x = 0;
  for (var i = 0; i <= width / symbolSize; i++) {
    var stream = new Stream();
    stream.generateSymbols(x, random(-2000, 0));
    streams.push(stream);
    x += symbolSize
  }

  textFont('Consolas');
}

function draw() {
  textSize(symbolSize);
  background(0, 150);
  streams.forEach(function (stream) {
    stream.render();
  });
  messageBox();
  displayMessage();
  if (hasStarted == false) {
    console.log('start message');
    constructMessage();
  }
  hasStarted = true;
}

function Symbol(x, y, speed, first, opacity) {
  this.x = x;
  this.y = y;
  this.value;

  this.speed = speed;
  this.first = first;
  this.opacity = opacity;

  this.switchInterval = round(random(2, 25));

  this.setToRandomSymbol = function () {
    var charType = round(random(0, 5));
    if (frameCount % this.switchInterval == 0) {
      if (charType > 1) {
        this.value = String.fromCharCode(
          0x30A0 + floor(random(0, 97))
        );
      } else {
        this.value = floor(random(0, 10));
      }
    }
  }

  this.rain = function () {
    this.y = (this.y >= height + symbolSize) ? 0 : this.y += this.speed;
  }

}

function Stream() {
  this.symbols = [];
  this.totalSymbols = round(random(5, 18));
  this.speed = random(1, 5);

  this.generateSymbols = function (x, y) {
    var opacity = 255;
    var first = round(random(0, 4)) == 1;
    for (var i = 0; i <= this.totalSymbols; i++) {
      symbol = new Symbol(
        x,
        y,
        this.speed,
        first,
        opacity
      );
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      opacity -= (255 / this.totalSymbols) / fadeInterval;
      y -= symbolSize;
      first = false;
    }
  }

  this.render = function () {
    this.symbols.forEach(function (symbol) {
      if (symbol.first) {
        fill(180, 255, 210, symbol.opacity);
      } else {
        fill(0, 255, 80, symbol.opacity);
      }
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
    });
  }
}

function messageBox() {
  console.log('drawing message box');
  this.opacity = opacity;
  var boxX1 = (width / 8);
  var boxY1 = (height / 5);
  var boxX2 = 6 * (width / 8);
  var boxY2 = 3 * (height / 5);

  if (frameCount > 180 && opacity <= 200) {
    opacity += 5;
  }
  fill(0, opacity);
  rect(boxX1, boxY1, boxX2, boxY2);
}

function constructMessage() {
  console.log('displaying message')
  this.displayedMessage = displayedMessage;

  setTimeout(type, 7000);

  function type() {
    console.log('type')
    nextChar();
    function nextChar() {
      this.currentCharToType = currentCharToType;
      if (currentCharToType < messageAsArray.length) {
        displayedMessage += messageAsArray[currentCharToType];
        console.log(displayedMessage);
        currentCharToType++;
      } else if (currentCharToType >= messageAsArray.length) {
        finished = true
      }
    }
    if (finished == false) {
      setTimeout(type, round(random(0, 10)));
    }
  }
}

function displayMessage() {
  textSize(letterSize);
  this.letterSize = letterSize;
  this.displayedMessage = displayedMessage;
  var header = "Neo_K >"

  var headerX1 = width / 7;
  var headerY1 = height / 4;
  var headerX2 = headerX1 + (letterSize * 5);
  var headerY2 = headerY1 + letterSize;

  var textX1 = headerX1 + ((header.length - 2) * letterSize);
  var textY1 = height / 4;
  var textX2 = width - (2 * (width / 7)) - (letterSize * 4);
  var textY2 = height - (2 * (height / 4));

  fill(0, 255, 80);
  if (frameCount > 300) {
    text(header, headerX1, headerY1, headerX2, headerY2);
  }
  text(displayedMessage, textX1, textY1, textX2, textY2);
}