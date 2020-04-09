var streams = [];
var fadeInterval = 2;
var symbolSize = 25;
var opacity = 0;
var message = "Lorem ipsum dolor sit amet";

function setup() {
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
  textSize(symbolSize);
}

function draw() {
  background(0, 150);
  streams.forEach(function (stream) {
    stream.render();
  });
  /* MessageBox();
  TypeWriter();
  DisplayMessage(); */
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
  this.totalSymbols = round(random(5, 35));
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

function MessageBox() {
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

function DisplayMessage() {
  var boxX1 = (width / 8);
  var boxY1 = (height / 5);
  var boxX2 = 6 * (width / 8);
  var boxY2 = 3 * (height / 5);
  var textX1 = boxX1 + symbolSize * 2;
  var textY1 = boxY1 + symbolSize * 2;
  var textX2 = boxX2 - symbolSize * 2;
  var textY2 = boxY2 - symbolSize * 2;
  this.message = message;

  /* var captionLength = 0;
  var caption = 'Lorem ipsum dolor';

  if (captionLength < caption.length + 1) {
    setTimeout('type()', 50);
  } else {
    captionLength = 0;
    caption = '';
  } */

  fill(255);
  text(message, textX1 + (5 * symbolSize), textY1, textX2 - (6 * symbolSize), textY2);
}