import { parse } from "./functions/parse.mjs";

const s = parse("day11sample.txt");
const d = parse("day11.txt");
const stransform = parse("day11sampletransformed.txt");

const addRowsCols = (arr) => {
  const result = [];

  for (let row of arr) {
    if (!row.includes("#")) {
      result.push(row);
    }
    result.push(row);
  }

  let col = 0;

  while (col < result.length) {
    let check = false;
    for (let i = 0; i < result.length; i++) {
      let elem = result[i][col];

      if (elem === "#") {
        check = true;
        break;
      }
    }
    if (!check) {
      for (let i = 0; i < result.length; i++) {
        let string = result[i];
        // console.log(string);
        result[i] = string.slice(0, col) + "." + string.slice(col);
        // console.log(result[i]);
      }
      col++;
    }
    col++;
  }

  return result;
};
// const n = addRowsCols(s);

const replace = (arr) => {
  const result = [];
  let count = 1;
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    let row = arr[i];
    while (row.includes("#")) {
      map.set(count, [i, row.indexOf("#")]);
      row = row.replace("#", "X");
      count++;
    }
    result.push(row);
  }

  return [result, map];
};
const [replaced, map] = replace(addRowsCols(d));
// console.log(map);
// console.log(replaced);

const findDistances = (arr, map) => {
  let sum = 0;

  for (let i = 1; i <= map.size; i++) {
    let key1 = i;
    let coord1 = map.get(i);
    for (let j = i + 1; j <= map.size; j++) {
      let key2 = j;
      let coord2 = map.get(j);
      sum += Math.abs(coord1[0] - coord2[0]) + Math.abs(coord1[1] - coord2[1]);
    }
  }
  return sum;
};
console.log(findDistances(replaced, map));
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
