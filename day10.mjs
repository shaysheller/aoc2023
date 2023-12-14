import { parse, directions } from "./functions/parse.mjs";
import * as fs from "fs";
// console.log(fs.readFileSync("day10.txt").length);

const s = parse("day10sample.txt");
const d = parse("day10.txt");

const run = (arr) => {
  const doWhile = (row, col, prev) => {
    const result = [[...prev]];
    console.log("intial result", result);

    // const nextPrev = [row, col];
    let curr = arr[row][col];
    while (curr !== "S") {
      if (curr === "S") {
        break;
      }
      result.push([row, col]);
      let dir = [prev[0] - row, prev[1] - col];
      curr = arr[row][col];
      prev[0] = row;
      prev[1] = col;
      if (dir[0] === -1) {
        // going down
        if (curr === "|") {
          row = row + 1;
        } else if (curr === "J") {
          col = col - 1;
        } else if (curr === "L") {
          col = col + 1;
        }
      } else if (dir[0] === 1) {
        // going up
        if (curr === "|") {
          row = row - 1;
        } else if (curr === "7") {
          col = col - 1;
        } else if (curr === "F") {
          col = col + 1;
        }
      } else if (dir[1] === -1) {
        // going right
        if (curr === "-") {
          col = col + 1;
        } else if (curr === "7") {
          row = row + 1;
        } else if (curr === "J") {
          row = row - 1;
        }
      } else {
        // going left
        if (curr === "-") {
          col = col - 1;
        } else if (curr === "F") {
          row = row + 1;
        } else if (curr === "L") {
          row = row - 1;
        }
      }
      curr = arr[row][col];
    }
    return result;
  };

  const findConnection = (row, col) => {
    for (let i = 0; i < directions.length; i++) {
      const [dr, dc] = directions[i];
      if (
        row + dr >= 0 &&
        col + dc >= 0 &&
        row + dr < arr.length &&
        col + dc < arr[0].length
      ) {
        if (dr === 1 || dr === -1) {
          let next = arr[row + dr][col + dc];
          if (dr === 1) {
            // down
            if (next === "|" || next === "L" || next === "J") {
              return doWhile(row + dr, col + dc, [row, col]);
            }
          } else {
            // up
            if (next === "|" || next === "7" || next === "F") {
              return doWhile(row + dr, col + dc, [row, col]);
            }
          }
        } else if (dc === 1 || dc === -1) {
          let next = arr[row + dr][col + dc];
          if (dc === 1) {
            // right
            if (next === "-" || next === "7" || next === "J") {
              return doWhile(row + dr, col + dc, [row, col]);
            }
          } else {
            // left
            if (next === "-" || next === "F" || next === "L") {
              return doWhile(row + dr, col + dc, [row, col]);
            }
          }
        }
      }
    }
  };

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === "S") {
        const result = findConnection(i, j);
        console.log(result);
        return Math.ceil(result.length / 2);
      }
    }
  }

  return [];
};

console.log(("sample", run(s)));
console.log("data", run(d));

// previous node direction? if curr = | and prev was above we must go down
