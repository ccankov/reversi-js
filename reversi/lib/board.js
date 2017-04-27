let Piece = require("./piece");

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
  let grid = [
    new Array(8),
    new Array(8),
    new Array(8),
    new Array(8),
    new Array(8),
    new Array(8),
    new Array(8),
    new Array(8)
  ];
  grid[3][4] = new Piece('black');
  grid[4][3] = new Piece('black');
  grid[3][3] = new Piece('white');
  grid[4][4] = new Piece('white');
  return grid;
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  if (!this.isValidPos(pos)) {
    throw new Error('Invalid position');
  }
  return this.grid[pos[0]][pos[1]];
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
  let moves = this.validMoves(color);
  return moves.length > 0;
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  return this.getPiece(pos) && this.getPiece(pos).color === color;
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  return this.getPiece(pos) !== undefined;
};

/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
  return !(this.hasMove('black') && this.hasMove('white'));
};

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  return !(pos[1] > 7 || pos[1] < 0 || pos[0] > 7 || pos[0] < 0);
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns null if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns null if it hits an empty position.
 *
 * Returns null if no pieces of the opposite color are found.
 */
function _positionsToFlip (board, pos, color, dir, piecesToFlip) {
  let nextPos = [pos[0] + dir[0], pos[1] + dir[1]];

  // out of bounds || empty space
  if (!board.isValidPos(nextPos) || !board.isOccupied(nextPos)) {
    return null;
  }

  if (board.getPiece(nextPos).color === color) {
    if (piecesToFlip.length === 0) {
      return null;
    } else {
      return piecesToFlip;
    }
  } else {
    piecesToFlip.push(board.getPiece(nextPos));
    return _positionsToFlip(board, nextPos, color, dir, piecesToFlip);
  }

}

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
  if (!this.validMove(pos, color)) {
    throw new Error('Invalid move');
  }
  this.grid[pos[0]][pos[1]] = new Piece(color);
  let allPiecesToFlip = [];
  for (let i = 0; i < Board.DIRS.length; i++) {
    let dir = Board.DIRS[i];
    let piecesToFlip = _positionsToFlip(this, pos, color, dir, []);
    if (piecesToFlip !== null) {
      allPiecesToFlip = allPiecesToFlip.concat(piecesToFlip);
    }
  }
  allPiecesToFlip.forEach((piece) => piece.flip());
};

/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
  let printBoard = new Board();
  for (let i = 0; i < this.grid.length; i++) {
    for (let j = 0; j < this.grid[i].length; j++) {
      let pos = [i, j];
      if (this.isOccupied(pos)) {
        let piece = this.getPiece(pos);
        printBoard.grid[i][j] = piece.toString();
      } else {
        printBoard.grid[i][j] = '_';
      }
    }
  }
  console.log(printBoard);
};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  if (this.isOccupied(pos)) {
    return false;
  }
  for (let i = 0; i < Board.DIRS.length; i++) {
    let dir = Board.DIRS[i];
    let piecesToFlip = _positionsToFlip(this, pos, color, dir, []);
    if (piecesToFlip !== null) {
      return true;
    }
  }
  return false;
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
  let moves = [];
  for (let i = 0; i < this.grid.length; i++) {
    for (let j = 0; j < this.grid[i].length; j++) {
      let pos = [i, j];
      if (this.validMove(pos, color)) {
        moves.push(pos);
      }
    }
  }
  return moves;
};

module.exports = Board;
