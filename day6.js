import * as fs from "fs";

const data = fs.readFileSync("day6.txt", "utf-8");

const sampleData = fs.readFileSync("day6sample.txt", "utf-8");

const arr = data.split("\n");

const sampleArr = sampleData.split("\n");

const parseData = (arr) => {
  const timeResult = arr[0].split(" ").filter((a) => a.match(/\d/g));
  const modifiedTimeResult = timeResult.map((a) => {
    let num = Number(a.replace(/\D/g, ""));
    return num;
  });

  const distanceResult = arr[1].split(" ").filter((a) => a.match(/\d/g));
  const modifiedDistanceResult = distanceResult.map((a) => {
    let num = Number(a.replace(/\D/g, ""));
    return num;
  });

  const result = modifiedTimeResult.map((a, index) => {
    return [a, modifiedDistanceResult[index]];
  });
  // return [modifiedTimeResult, modifiedDistanceResult];
  console.log(result);
  return result;
};

// const [time, distance] = parseData(arr);

// const [sampleTime, sampleDistance] = parseData(sampleArr);

// console.log(time, distance);
const a = parseData(arr);
const b = parseData(sampleArr);
console.log(a);
console.log(b);

const search = (time, distance) => {
  let left = 0;
  let min = Infinity;
  let max = -Infinity;

  let right = time;

  while (min === Infinity) {
    if (check(left, time - left, distance)) {
      console.log(left, time - left, distance);
      min = left;
    }
    left++;
  }

  while (max === -Infinity) {
    if (check(right, time - right, distance)) {
      console.log(max);
      max = Math.max(max, right);
    }
    right--;
  }
  console.log(min, max);
  return max - min + 1;
};

const check = (charge, remaining, distance) => {
  if (charge * remaining > distance) return true;
  return false;
};

console.log(check(7, 940200 - 7, 940200));

const bin = (time, distance, end) => {
  let left;
  let right;

  if (end === distance) {
    left = Math.floor(time / 2);
    right = time;

    while (left < right) {
      let mid = Math.floor((left + right) / 2);

      if (check(mid, time - mid, distance)) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    return left - 1;
  } else {
    left = 0;
    right = Math.floor(time / 2);
    while (left < right) {
      let mid = Math.floor((left + right) / 2);

      if (check(mid, time - mid, distance)) {
        console.log(mid);
        right = mid;
      } else {
        console.log(mid);
        left = mid + 1;
      }
    }
    return left;
  }
};

const pls = [71530, 940200];

// let left = bin(71530, 940200, 940200 / 2);
// console.log(left);
// let right = bin(71530, 940200, 940200);
// console.log(right);

let left = bin(48938466, 261119210191063, Math.floor(261119210191063 / 2));
let right = bin(48938466, 261119210191063, 261119210191063);

console.log(right - left + 1);

// console.log(search(48938466, 261119210191063));
// console.log(search(71530, 940200));

// 71503

// 36749103

/*
    first thought is maybe we can try a form of binary search?
    could also try two pointer

    binary search seems weird since we are looking for least least 
    and most amount of charge we can get away with 
        meaning it won't converge on one point 




*/
