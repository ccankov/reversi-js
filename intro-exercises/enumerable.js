'use strict';

Array.prototype.myEach = function myEach(callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i]);
  }
};

console.log('--myEach--');
[1, 2, 3].myEach((num) => console.log(num));

Array.prototype.myMap = function myMap(callback) {
  let resultArr = [];

  this.myEach((num) => resultArr.push(callback(num)));

  return resultArr;
};

console.log('--myMap--');
console.log([1, 2, 3].myMap((num) => num * 2));

Array.prototype.myInject = function myInject(callback) {

  let accumulator = this[0];
  let subArr = this.slice(1);

  subArr.myEach((num) => {
    accumulator = callback(accumulator, num);
    return accumulator;
  });

  return accumulator;
};

console.log('--myInject--');
console.log([1, 2, 3].myInject((sum, num) => sum + num));
