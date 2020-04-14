var streams = [];
var fadeInterval = 2;
var symbolSize = 20;
var opacity = 0;
var message = "Hello Captain.\nWelcome in the Matrix.\nI hope you and your family continue to be in good health.\nFor more than 3 weeks I have been searching for a secure gateway to respond to your original transmission format.\nHere is an update on how this crew member of your battleship ‘ECO’ is dealing with this COVID-19 quarantine.\nCurrently all ‘ECO’ crew members are safe and operating from their private locations to protect themselves from the COVID-19 Sentinels.\nAll systems are performing well, although occasional sound issues may hinder proper live communication.\nRunning projects continue to be managed remotely as much as possible to enable a swift reboot after IT’s Frozen Period.\nOn a personal level, I try to stay physically in shape with daily walks, runs or bike tours.\nIn my experience, my endurance level is particularly being challenged through the social isolation from my dears for such a long time.\nI believe humans are not commonly designed to cope with that kind of circumstances.\nIn the Matrix however, every human is transformidable. \nIn the Matrix, COVID-19 is just another Agent, bound to be destroyed by an intelligent anti-virus program, executed by transformidable people.\nIt is just a matter of time. And patience.\nI look forward, with good faith, to the day we meet again IRL, Captain.\n \nNeo_K";
var messageAsArray = message.split('');
var displayedMessage = "";
var currentCharToType = 0;
var letterSize = 13;
var hasStarted = false;
var hasDrawnMessageBox = false;
var finished = false;

function setup() {
  //console.log(message.length);
  frameRate(30);
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  background(0);

  var x = 0;
  for (var i = 0; i <= width / symbolSize; i++) {
    var stream = new Stream();
    stream.generateSymbols(x, random(-1000, 0));
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
    //console.log('start message');
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
  this.speed = random(2, 10);

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
  //console.log('drawing message box');
  this.opacity = opacity;
  var boxX1 = (width / 8);
  var boxY1 = (height / 5);
  var boxX2 = 6 * (width / 8);
  var boxY2 = 3 * (height / 5) + (1 * letterSize);

  if (frameCount > 90 && opacity <= 200) {
    opacity += 10;
  }
  fill(0, opacity);
  rect(boxX1, boxY1, boxX2, boxY2);
}

function constructMessage() {
  //console.log('displaying message')
  this.displayedMessage = displayedMessage;

  setTimeout(type, 8000);

  function type() {
    //console.log('type')
    nextChar();
    function nextChar() {
      this.currentCharToType = currentCharToType;
      if (currentCharToType < messageAsArray.length) {
        displayedMessage += messageAsArray[currentCharToType];
        //console.log(displayedMessage);
        currentCharToType++;
      } else if (currentCharToType >= messageAsArray.length) {
        finished = true
      }
    }
    if (finished == false) {
      setTimeout(type, round(random(1, 100)));
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
  var textY1 = (height / 4);
  var textX2 = width - (2 * (width / 7)) - (letterSize * 4);
  var textY2 = height - (2 * (height / 4)) + (5 * letterSize);

  fill(0, 255, 80);
  if (frameCount > 150) {
    text(header, headerX1, headerY1, headerX2, headerY2);
  }
  text(displayedMessage, textX1, textY1, textX2, textY2);
}