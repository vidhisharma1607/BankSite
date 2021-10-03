const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
dogs.forEach(dog => (dog.foodPortion = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);
const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(sarahDog);
console.log(
  `sarah's dog is eating ${
    dogs.curFood > dogs.foodPortion ? 'too much' : 'to little'
  }
  `
);
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.foodPortion)
  .flatMap(dog => dog.owners)
  .flat();
console.log(ownersEatTooMuch);
