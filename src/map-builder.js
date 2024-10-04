// Default size of map (in tiles)
const DEFAULT_WIDTH = 30;
const DEFAULT_HEIGHT = 15;

export class MapBuilder {
  /**
   * Initialize MapBuilder parameters;
   *
   * @param {HTMLElement} container DOM node containing swatches and map
   * @param {{ width?: number, height?: number }} params
   */
  constructor(container, { width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT }) {
    /** @type {HTMLElement} */
    this.elem = container;

    // TODO: implement (add more member variables)
    // hint: consider the addition of optional height and width parameters
    this.width = width;
    this.height = height;
    this.isDrawing = false; //to track mouse state for drawing

    //initialize the map canvas and palette
    this.setupPalette();
    this.setupMapCanvas();
  }

  /**
   * Initializes our {@link selectedSwatchName} to the default selected swatch.
   *
   * Adds a 'click' event listener to each element with the 'swatch' class, which
   * sets the selected swatch to the tile's own.
   */
  setupPalette() {
    const swatches = this.elem.querySelectorAll('.swatch');
    this.selectedSwatchName = Array.from(swatches).find((swatch) =>
      swatch.classList.contains('selected'),
    ).classList[1];

    swatches.forEach((swatch) => {
      swatch.addEventListener('click', (event) => {
        Array.from(swatches).forEach((otherSwatch) =>
          otherSwatch.classList.remove('selected'),
        );
        event.target.classList.add('selected');
        this.selectedSwatchName = event.target.classList[1];
      });
    });
  }

  /**
   * Creates the map in the `<div class="map">` (see index.html) using a "grid" of
   * divs, which are styled using the swatch styles in main.css.
   */
  setupMapCanvas() {
    // TODO: build grid with divs
    // hint: each row can use the 'row' class and each tile should use 'swatch' + some swatch type.
    //       check `setupPalette` for reference if you're not sure where to start!
    //
    // TODO: add event listeners to your swatches to handle mouse inputs for changing the map
    // hint: consider the following 4: mouseenter, mouseleave, mousedown, mouseup.
    //       we've also included helper functions below to manage display and tile storage!

    const mapDiv = this.elem.querySelector('.map');
    mapDiv.innerHTML = ''; //clear the existing content

    for (let row = 0; row < this.height; row++) {
      const rowDiv = document.createElement('div');
      rowDiv.classList.add('row');

      for (let col = 0; col < this.width; col++) {
        const tile = document.createElement('div');
        tile.classList.add('swatch', 'grass'); //default type
        setTileType(tile, 'grass'); 

        this.addTileEventListeners(tile);
        rowDiv.appendChild(tile);
      }

      mapDiv.appendChild(rowDiv);
    }
  }

  /**
   * Add event listeners to a tile for drawing functionality
   * 
   * @param {HTMLElement} tile
   */
  addTileEventListeners(tile) {
    let originalType = getTileType(tile); // Store the original swatch type

    tile.addEventListener('mouseenter', () => {
      this.isDrawing ? (originalType = this.selectedSwatchName, setTileType(tile, this.selectedSwatchName)) : null;
      setTileDisplay(tile, this.selectedSwatchName);
    });

    tile.addEventListener('mouseleave', () => {
      if (!this.isDrawing) {
        // Revert the tile display on mouse leave
        setTileDisplay(tile, originalType);
      }
    });

    tile.addEventListener('mousedown', () => {
      this.isDrawing = true;
      originalType = this.selectedSwatchName; // Update the original type on click
      setTileType(tile, this.selectedSwatchName);
      setTileDisplay(tile, this.selectedSwatchName);
    });

    window.addEventListener('mouseup', () => {
      this.isDrawing = false;
    });
  }
}

/**
 * Gets a tile's stored swatch type.
 *
 * @param {HTMLElement} tile
 * @returns {string} The swatch type's class name
 */
export function getTileType(tile) {
  return tile.dataset['type'] ?? 'grass';
}

/**
 * Sets a tile's stored swatch type.
 *
 * @param {HTMLElement} tile
 * @param {string} swatchType The swatch type's class name
 */
export function setTileType(tile, swatchType) {
  tile.dataset['type'] = swatchType;
}

/**
 * Updates a tile's appearance with the given swatch type.
 *
 * @param {HTMLElement} tile
 * @param {string} swatchType The swatch type's class name
 */
export function setTileDisplay(tile, swatchType) {
  tile.className = `swatch ${swatchType}`;
}