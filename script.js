'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const currentDate = new Date();
const day = currentDate.getDate();
const month = currentDate.getMonth();
const year = currentDate.getFullYear();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
let currentAccount;
const updateUI = function (acc) {
  displayMovements(currentAccount.movements);
  calcSummary(currentAccount);
  displayBalance(currentAccount);
};
containerApp.style.opacity = 0;

//
//
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(accounts);
/////////////////////////////////////////////////

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  labelDate.textContent = `${day}/${month + 1}/${year} , ${hours}:${minutes}`;

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = ` 
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      
      <div class="movements__value">${mov.toFixed(2)}€</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
const calcSummary = function (acc) {
  const deposits = acc.movements
    .filter(movs => movs > 0)
    .reduce(function (acc, value) {
      acc += value;
      return acc;
    }, 0);
  labelSumIn.textContent = `${deposits.toFixed(2)}€`;

  const withdrawals = acc.movements.filter(movs => movs < 0);
  const withdrawalAmount = Math.abs(
    withdrawals.reduce(function (acc, value) {
      acc += value;
      return acc;
    }, 0)
  );
  labelSumOut.textContent = `${withdrawalAmount.toFixed(2)}€`;

  const interest = acc.movements
    .filter(movs => movs > 0)
    .map(value => (value * acc.interestRate) / 100)
    .reduce(function (acc, value) {
      acc += value;
      return acc;
    }, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};
const displayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, value) {
    acc += value;
    return acc;
  }, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

// const user = 'Steven Thomas Williams';

const createUserName = function (acc) {
  acc.forEach(function (accs) {
    accs.username = accs.owner
      .toLowerCase()
      .split(' ')
      .map(user => user[0])
      .join('');
  });
};
createUserName(accounts);

//Implimenting login
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  console.log('okayy');
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    updateUI(currentAccount);
    //Making the input fields empty again
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    containerApp.style.opacity = 100;
  }
});

//Making transfers
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  //To find the account object
  const recieverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  if (
    amount > 0 &&
    recieverAccount &&
    recieverAccount !== currentAccount &&
    amount <= currentAccount.balance
  ) {
    recieverAccount.movements.push(amount);
    currentAccount.movements.push(-amount);
  }
  updateUI(currentAccount);
  //Making the input fields empty again
  inputTransferAmount.value = inputTransferTo.value = '';
  console.log(amount, recieverAccount);
});

//Requesting loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  //using some function
  const amount = Number(inputLoanAmount.value);
  if (currentAccount.movements.some(mov => mov > amount * 0.1)) {
    currentAccount.movements.push(amount);
    inputLoanAmount.value = '';
    updateUI(currentAccount);
  }
});

//Closing account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === inputCloseUsername.value
    );
    console.log(index);

    //deleting the account
    accounts.splice(index, 1);
    //hiding UI (logging out)
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
    inputCloseUsername.value = inputClosePin.value = '';
    updateUI(currentAccount);
  }
});
// Sorting Button
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
