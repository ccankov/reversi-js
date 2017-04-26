'use strict';

function range(startNum, endNum) {
  if (startNum >= endNum - 1) {
    return [];
  }
  return [startNum + 1].concat(range(startNum + 1, endNum));
}

console.log('--range--');
console.log(range(1, 5));
