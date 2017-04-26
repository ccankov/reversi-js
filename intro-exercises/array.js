'use strict';

// myUniq
Array.prototype.myUniq = function myUniq() {
  let returnArray = [];
  for (let i = 0; i < this.length; i++) {
    let val = this[i];
    if (!returnArray.includes(val)) {
      returnArray.push(val);
    }
  }
  return returnArray;
};

console.log('myUniq:');
console.log([1, 2, 1, 3, 3].myUniq());

// twoSum
Array.prototype.twoSum = function twoSum() {
  let twoSumIndices = [];
  for (let i = 0; i < this.length - 1; i++) {
    for (let j = i + 1; j < this.length; j++) {
      let firstVal = this[i];
      let secondVal = this[j];
      if (firstVal + secondVal === 0) {
        twoSumIndices.push([i, j]);
      }
    }
  }
  return twoSumIndices;
};

console.log('twoSum:');
console.log([-1, 0, 2, -2, 1].twoSum());

// transpose
Array.prototype.transpose = function transpose() {
  let transArr = [];
  for (let i = 0; i < this.length; i++) {
    for (let j = 0; j < this[i].length; j++) {
      if (transArr[j] === undefined) {
        transArr[j] = [];
      }
      transArr[j][i] = this[i][j];
    }
  }
  return transArr;
};

console.log('transpose:');
console.log([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ].transpose());
