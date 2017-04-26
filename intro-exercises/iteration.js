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

String.prototype.substrings = function substrings() {
  let resultArr = [];
  for (let i = 0; i < this.length; i++) {
    for (let j = i + 1; j <= this.length; j++) {
      let subStr = this.slice(i, j);
      if (!resultArr.includes(subStr)) {
        resultArr.push(subStr);
      }
    }
  }
  return resultArr;
};

console.log('--substrings--');
let str = 'hello';
console.log(str.substrings());
