import { parse } from "./functions/parse.mjs";

const s = parse("day11sample.txt");
const d = parse("day11.txt");
const stransform = parse("day11sampletransformed.txt");

/// this function needs to find the numbers of rows and columns that are empty between [x1,y1] and [x2,y2]

// could also store in two sets -> one row set one col set
// if the row or col is in the set that means it was empty

const findRowsAndCols = (arr) => {
  let rows = new Set();
  let cols = new Set();

  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].includes("#")) {
      rows.add(i);
    }
  }

  let col = 0;
  console.log("a");

  while (col < arr[0].length) {
    let check = false;
    for (let i = 0; i < arr.length; i++) {
      let elem = arr[i][col];
      if (elem === "#") {
        check = true;
        break;
      }
    }
    if (!check) {
      cols.add(col);
    }
    col++;
  }
  console.log("b");
  return [rows, cols];
};

const replace = (arr) => {
  let count = 1;
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    let row = arr[i];
    while (row.includes("#")) {
      map.set(count, [i, row.indexOf("#")]);
      row = row.replace("#", "X");
      count++;
    }
  }

  return map;
};
const map = replace(d);
const [rowSet, colSet] = findRowsAndCols(d);

console.log(map);
console.log(rowSet, colSet);

const multiplier = ([x1, y1], [x2, y2], multiplier) => {
  let c = 0;
  let r = 0;

  // horizontal distance,  need to know how many columns were added

  for (let i = Math.min(y1, y2); i < Math.max(y1, y2); i++) {
    if (colSet.has(i)) {
      c = c + (multiplier - 1);
    }
    c++;
  }

  for (let i = Math.min(x1, x2); i < Math.max(x1, x2); i++) {
    if (rowSet.has(i)) {
      r = r + (multiplier - 1);
    }
    r++;
  }

  return c + r;
};

const findDistances = (map) => {
  let sum = 0;

  for (let i = 1; i <= map.size; i++) {
    let coord1 = map.get(i);
    for (let j = i + 1; j <= map.size; j++) {
      let coord2 = map.get(j);
      sum += multiplier([...coord1], [...coord2], 1000000);
    }
  }
  return sum;
};
let res = findDistances(map);
console.log(res);
// console.log(findDistances(replaced, map));
// const str = replaced.spli;
// console.log(replaced.join("\n") === stransform.join("\n"));
// console.log(replaced.join("\n"));
// console.log(stransform.join("\n"));
/*
    now we need to replace all the # with numbers

*/

/*
    if there is no # in a row, we can just add an array directly below that row
    if there is no # in a column, we need to stop the count and then immediately add a . to every single row in that index
    and then begin the count again

    I think one possible solution is that we could push all the #'s to the map with their original index.

    then maybe we could look for how many rows and cols between them are empty

    then we can get their distance

    distance = original distance + 1,000,000 * numOfEmptyRowsAndCols;




*/
