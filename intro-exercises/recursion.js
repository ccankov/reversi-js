'use strict';

function range(startNum, endNum) {
  if (startNum >= endNum - 1) {
    return [];
  }
  return [startNum + 1].concat(range(startNum + 1, endNum));
}

console.log('--range--');
console.log(range(1, 5));

Array.prototype.sumRecursive = function sumRecursive() {
  if (this.length === 0) {
    return 0;
  }

  return this[0] + this.slice(1).sumRecursive();

};

console.log("--sum--");
console.log([1,2,3].sumRecursive());

function expOne(base, power) {

  if (power === 0) {
    return 1;
  }

  return base * expOne(base, power - 1);
}

console.log("--exp 1--");
console.log(expOne(2, 5));

function expTwo(base, power) {

  if (power === 0) {
    return 1;
  }

  if (power === 1) {
    return base;
  }

  if (power % 2 === 0) {
    let recursiveResult = expTwo(base, power / 2);
    return recursiveResult * recursiveResult;
  } else {
    let recursiveResult = expTwo(base, (power - 1) / 2);
    return base * recursiveResult * recursiveResult;
  }
}

console.log("--exp 2--");
console.log(expTwo(2, 5));
console.log(expTwo(2, 6));


function recursiveFib(n) {
  switch (n) {
    case 0:
      return [];
    case 1:
      return [1];
    case 2:
      return [1, 1];
    default:
      let lowerFibs = recursiveFib(n-1);
      let nextNum = lowerFibs[lowerFibs.length - 1] +
                    lowerFibs[lowerFibs.length - 2];
      return lowerFibs.concat([nextNum]);
  }
}

function iterativeFib(n) {
  switch (n) {
    case 0:
      return [];
    case 1:
      return [1];
    case 2:
      return [1, 1];
    default:
      let fibsArr = [1, 1];
      while (fibsArr.length < n) {
        fibsArr.push(fibsArr[fibsArr.length - 1] + fibsArr[fibsArr.length - 2]);
      }
      return fibsArr;
  }
}

console.log("--recursiveFib--");
console.log(recursiveFib(0));
console.log(recursiveFib(1));
console.log(recursiveFib(2));
console.log(recursiveFib(5));

console.log("--iterativeFib--");
console.log(iterativeFib(0));
console.log(iterativeFib(1));
console.log(iterativeFib(2));
console.log(iterativeFib(5));

Array.prototype.bsearch = function bsearch(target) {
  if (this.length === 0) {
    return null;
  }
  let midIdx = Math.floor(this.length / 2);
  let midVal = this[midIdx];
  if (midVal === target) {
    return midIdx;
  } else if (target > midVal) {
    let upperSearch = this.slice(midIdx + 1).bsearch(target);
    return upperSearch === null ? null : midIdx + 1 + upperSearch;
  } else {
    return this.slice(0, midIdx).bsearch(target);
  }
};

console.log("--bsearch--");
console.log([1, 2, 3].bsearch(1));
console.log([2, 3, 4, 5].bsearch(3));
console.log([2, 4, 6, 8, 10].bsearch(6));
console.log([1, 3, 4, 5, 9].bsearch(5));
console.log([1, 2, 3, 4, 5, 6].bsearch(6));
console.log([1, 2, 3, 4, 5, 6].bsearch(0));
console.log([1, 2, 3, 4, 5, 7].bsearch(6));


function greedyChange(value, coins) {
  if (value < coins[coins.length - 1]) {
    return [];
  }

  let change = [];

  for (let i = 0; i < coins.length; i++) {
    if (coins[i] <= value) {
      change.push(coins[i]);
      var subChange = greedyChange(value - coins[i], coins);
      break;
    }
  }

  return change.concat(subChange);
}

console.log("--greedy change--");
console.log(greedyChange(14, [10, 7, 1]));

function betterChange(value, coins) {
  if (value < coins[coins.length - 1]) {
    return [];
  }

  let bestChange = [];

  for (let i = 0; i < coins.length; i++) {

    let currentChange = [];
    let subChange;

    if (coins[i] <= value) {
      currentChange.push(coins[i]);
      subChange = betterChange(value - coins[i], coins.slice(i));
    } else {
      continue;
    }

    currentChange = currentChange.concat(subChange);

    if (bestChange.length === 0 || bestChange.length > currentChange.length) {
      bestChange = currentChange;
    }
  }
  return bestChange;
}

console.log("--best change--");
console.log(betterChange(14, [10, 7, 1]));
