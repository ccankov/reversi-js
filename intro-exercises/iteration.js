'use strict';

Array.prototype.bubbleSort = function bubbleSort() {
  let sorted = false;

  while(!sorted) {
    sorted = true;
    for (let i = 0; i < this.length - 1; i++) {
      if (this[i] > this[i+1]) {
        sorted = false;
        let temp = this[i+1];
        this[i+1] = this[i];
        this[i] = temp;
      }
    }
  }

  return this;
};

console.log('--bubbleSort--');
let a = [6, 5, 3, 2, 3, 7];
console.log(a);
a.bubbleSort();
console.log(a);
