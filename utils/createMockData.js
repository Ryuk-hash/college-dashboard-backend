exports.getRandom = (arr, n) => {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len) throw new RangeError('getRandom: more elements taken than available');
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};

exports.setRandomValue = () => {
  let result = Math.floor(Math.random() * 10);
  if (result > 0) {
    return result;
  }
  return 5;
};

exports.randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

findRandom = (n) => {
  return Math.floor(Math.random() * n);
};

exports.getBatchYear = (year) => {
  let batchYear = year;
  switch (true) {
    case year === 2020:
      year = year + findRandom(2);
      break;

    case year < 2015:
      year = year + findRandom(5);
      break;

    case year > 2021:
      year = 0;
      break;

    default:
      break;
  }

  return batchYear;
};
