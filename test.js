'use strict';

const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const events = require('events');

const ICON_SIZE = 32;

async function hashIcon(canvas, id, iconFile) {
  const context = canvas.getContext('2d');
  context.fillRect(0, 0, ICON_SIZE, ICON_SIZE);

  await writePNG(canvas, `results/${id}-black.png`);

  const icon = await loadImage(iconFile);
  context.drawImage(icon, 0, 0, ICON_SIZE, ICON_SIZE);

  await writePNG(canvas, `results/${id}-drawn.png`);
}

async function writePNG(canvas, name) {
  const out = fs.createWriteStream(name);
  const png = canvas.createPNGStream();
  png.pipe(out);
  await events.once(out, 'finish');
}

const reuseCanvas = createCanvas(ICON_SIZE, ICON_SIZE);
for (let id = 0; id < 4; ++id) {
  hashIcon(reuseCanvas, `actual-${id}`, `${id}.png`);
}

for (let id = 0; id < 4; ++id) {
  const uniqueCanvas = createCanvas(ICON_SIZE, ICON_SIZE);
  hashIcon(uniqueCanvas, `expected-${id}`, `${id}.png`);
}
