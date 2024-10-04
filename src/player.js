// The size of a swatch (in pixels)
const SWATCH_SIZE = 25;

// Utility function - checks if a given swatch name is walkable terrain.
const isTerrain = (swatchType) =>
  [
    'grass',
    'flowers-red',
    'flowers-orange',
    'flowers-blue',
    'weed',
    'weed-4x',
    'weed-small',
    'weed-2x',
    'field',
    'sand-patch',
    'sand',
    'sand-nw',
    'sand-n',
    'sand-ne',
    'sand-w',
    'sand-e',
    'sand-sw',
    'sand-s',
    'sand-se',
    'sand-nw-inverse',
    'sand-ne-inverse',
    'sand-sw-inverse',
    'sand-se-inverse',
  ].indexOf(swatchType) >= 0;

export class Player {
  /**
   * Constructor for the player (Pikachu sprite).
   *
   * @param {number}     x       The beginning x coordinate (usually zero)
   * @param {number}     y       The beginning y coordinate (usually zero)
   * @param {MapBuilder} builder The MapBuilder object, with information about the map.
   *                             In particular, this builder object should have the container
   *                             element as a property so the '.map' div can be found using a
   *                             js 'elem.querySelector' call.
   */
  constructor(x, y, builder) {
    this.builder = builder;
    this.map = builder.elem.querySelector('.map');

    this.x = x;
    this.y = y;

    this.orientation = 'down';
    this.elem = document.createElement('div');
    this.elem.classList.add('player', 'facing-down');
    this.map.appendChild(this.elem);

    // TODO: add event listener to handle key press to make your
    //       pikachu moves when arrow keys are pressed
    document.addEventListener('keydown', (event) => this.handleKeyPress(event));
  }

  /**
   * Handles key press event to move the player 
   * 
   * @param {KeyboardEvent} event
   */
  handleKeyPress(event) {
    switch (event.key) {
      case 'ArrowLeft':
        this.moveLeft();
        break;
      case 'ArrowRight':
        this.moveRight();
        break;
      case 'ArrowUp':
        this.moveUp();
        break;
      case 'ArrowDown':
        this.moveDown();
        break;
    }
  } 

  /**
   * Changes the style of your character to face the
   * orientation provided as a parameter.
   *
   * @param {('down'|'up'|'left'|'right')} direction
   */
  setOrientation(direction) {
    // TODO: implement
    this.elem.classList.remove('facing-down', 'facing-up', 'facing-left', 'facing-right');
    this.elem.classList.add(`facing-${direction}`);
    this.orientation = direction;
  }

  /**
   * Moves the character's div to some discrete tile, since the map is not continuous.
   *
   * @param {number} x
   * @param {number} y
   */
  moveTo(x, y) {
    // TODO: implement
    // hint: look into the .style field of your character object (elem)
    //       specifically the 'left' and 'top' properties
    if (this.isValidMove(x, y)) {
      this.x = x;
      this.y = y;
      this.elem.style.left = `${x * SWATCH_SIZE}px`;
      this.elem.style.top = `${y * SWATCH_SIZE}px`
    }
  }

  /**
   * does bounds checking to determine whether the provided move is valid.
   *
   * @param {number} x
   * @param {number} y
   * @returns {boolean}
   */
  isValidMove(x, y) {
    // TODO: implement
    const tiles = this.map.querySelectorAll('.row')[y]?.children[x];
    if (!tiles) {
     return false; //out of map bounds
    }

    const tileType = tiles.dataset['type'];
    return isTerrain(tileType);
  }

  // TODO: complete these function definitions: use your moveTo, isValidMove,
  //       and setOrientation implementations to make functions that move your
  //       character in a specific direction
  moveLeft() {
    this.setOrientation('left');
    this.moveTo(this.x - 1, this.y);
  }

  moveRight() {
    this.setOrientation('right');
    this.moveTo(this.x + 1, this.y);
  }

  moveDown() {
    this.setOrientation('down');
    this.moveTo(this.x, this.y + 1);
  }

  moveUp() {
    this.setOrientation('up');
    this.moveTo(this.x, this.y - 1);
  }
}
