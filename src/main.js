import { MapBuilder } from './map-builder.js';
import { Player } from './player.js';

document.addEventListener('DOMContentLoaded', () => {
  const mapElement = document.getElementById('map-builder');

  const builder = new MapBuilder(mapElement, { width: 40, height: 20 });
  builder.setupPalette();
  builder.setupMapCanvas();

  new Player(0, 0, builder);
});
