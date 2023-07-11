// generate list of prime numbers
const getPrimes = (min, max) => {
  const result = Array(max + 1)
    .fill(0)
    .map((_, i) => i);
  for (let i = 2; i <= Math.sqrt(max + 1); i++) {
    for (let j = i ** 2; j < max + 1; j += i) delete result[j];
  }
  return Object.values(result.slice(Math.max(min, 2)));
};

// generate random number between min and max
const getRandNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// using random number as index in array of prime numbers
// to get a random prime number
const getRandPrime = (min, max) => {
  const primes = getPrimes(min, max);
  return primes[getRandNum(0, primes.length - 1)];
};

// to get gcd(a,b)
function gcd(a, b) {
  var r;
  while (b > 0) {
    r = a % b;
    a = b;
    b = r;
  }
  return a;
}

// get e of RSA algorithm
function rel_prime(phi) {
  var rel = 5;

  while (gcd(phi, rel) != 1) rel++;
  return rel;
}

// generate a^b
function power(a, b) {
  var temp = 1,
    i;
  for (i = 1; i <= b; i++) temp *= a;
  return temp;
}

// encrypt the plain text M using pair(e,N)
function encrypt(N, e, M) {
  var r,
    i = 0,
    prod = 1,
    rem_mod = 0;
  while (e > 0) {
    r = e % 2;
    if (i++ == 0) rem_mod = M % N;
    else rem_mod = power(rem_mod, 2) % N;
    if (r == 1) {
      prod *= rem_mod;
      prod = prod % N;
    }
    e = parseInt(e / 2);
  }
  return prod;
}

// calculate d of RSA algorithm
function calculate_d(phi, e) {
  var x, y, x1, x2, y1, y2, temp, r, orig_phi;
  orig_phi = phi;
  x2 = 1;
  x1 = 0;
  y2 = 0;
  y1 = 1;
  while (e > 0) {
    temp = parseInt(phi / e);
    r = phi - temp * e;
    x = x2 - temp * x1;
    y = y2 - temp * y1;
    phi = e;
    e = r;
    x2 = x1;
    x1 = x;
    y2 = y1;
    y1 = y;
    if (phi == 1) {
      y2 += orig_phi;
      break;
    }
  }
  return y2;
}

// decrypt cipher text c using private key pair (d,N)
function decrypt(c, d, N) {
  var r,
    i = 0,
    prod = 1,
    rem_mod = 0;
  while (d > 0) {
    r = d % 2;
    if (i++ == 0) rem_mod = c % N;
    else rem_mod = power(rem_mod, 2) % N;
    if (r == 1) {
      prod *= rem_mod;
      prod = prod % N;
    }
    d = parseInt(d / 2);
  }
  return prod;
}

// encrypt the string
const encryptMessage = (str, publicKey) => {
  let arr = [];
  for (let i = 0; i < str.length; i++) {
    let ascii = encrypt(str.charCodeAt(i));
    arr.push(ascii);
  }

  return arr;
};

// decrypt the text message
const decryptMessage = (arr, privateKey) => {
  let str = "";

  for (let i = 0; i < arr.length; i++) {
    let decoded = decrypt(arr[i]);
    str += String.fromCharCode(decoded);
  }

  return str;
};
