function Cat(name, owner) {
  this.name = name;
  this.owner = owner;
}

Cat.prototype.cuteStatement = function cuteStatement() {
  return `${this.owner} loves ${this.name}`;
};

let raymond = new Cat("Raymond", "Everybody");
let biscuit = new Cat("biscuit", "Chris");
let kitty = new Cat("kitty", "Elliot");

console.log(raymond.cuteStatement());
console.log(biscuit.cuteStatement());
console.log(kitty.cuteStatement());

Cat.prototype.cuteStatement = function cuteStatement() {
  return `Everyone loves ${this.name}`;
};

console.log(raymond.cuteStatement());
console.log(biscuit.cuteStatement());
console.log(kitty.cuteStatement());

Cat.prototype.meow = function meow() {
  return "Meow";
};

console.log(raymond.meow());
console.log(biscuit.meow());
console.log(kitty.meow());

raymond.meow = function () {
  return "Hi";
};

raymond.bark = function () {
  return "Woof";
};

console.log(raymond.meow());
console.log(biscuit.meow());
console.log(kitty.meow());

console.log(raymond);
console.log(kitty);
