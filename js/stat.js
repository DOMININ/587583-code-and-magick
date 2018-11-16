'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_COLOR = '#fff';
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var SHADOW_GAP_X = 10;
var SHADOW_GAP_Y = 10;
var TEXT_COLOR = '#000';
var TEXT_STYLE = '16px PT Mono';
var TEXT_BASELINE = 'hanging';
var TEXT_X = 120;
var TEXT_Y = 30;
var TEXT_GAP_X = 25;
var TEXT_WIN = 'Ура вы победили!';
var TEXT_RESULT = 'Список результатов:';
var TEXT_MAIN_CHARACTER = 'Вы';
var BAR_X = 150;
var BAR_Y = 250;
var BAR_TEXT_Y = 260;
var BAR_GAP = 100;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var MAIN_BAR_COLOR = 'rgba(255, 0, 0, 1)';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_GAP_X, CLOUD_Y + SHADOW_GAP_Y, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  ctx.fillStyle = TEXT_COLOR;
  ctx.font = TEXT_STYLE;
  ctx.textBaseline = TEXT_BASELINE;

  ctx.fillText(TEXT_WIN, TEXT_X, TEXT_Y);
  ctx.fillText(TEXT_RESULT, TEXT_X, TEXT_Y + TEXT_GAP_X);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = TEXT_COLOR;

    var barOffsetX = BAR_X + (BAR_GAP * i);
    var barHeight = BAR_HEIGHT * Math.round(times[i]) / maxTime;

    var generatingRandomColor = function () {
      return 'rgba(0, 0, 255,' + Math.random() + ')';
    };

    ctx.fillText(players[i], barOffsetX, BAR_TEXT_Y);
    ctx.fillText(Math.round(times[i]), BAR_X + (BAR_GAP) * i, BAR_Y - barHeight - 20);

    ctx.fillStyle = players[i] === TEXT_MAIN_CHARACTER ? MAIN_BAR_COLOR : generatingRandomColor();

    ctx.fillRect(barOffsetX, BAR_Y, BAR_WIDTH, -barHeight);
  }
};
