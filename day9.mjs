import { parse } from "./functions/parse.mjs";

// const d = parse("day9.txt")
//   .split(" ")
//   .map((a) => Number(a));
const ds = parse("day9sample.txt").map((a) => a.split(" ").map(Number));
const d = parse("day9.txt").map((a) => a.split(" ").map(Number));

// console.log(ds);

const run = (arr) => {
  console.log(arr);
  const newArr = [];
  //   console.log("hello");
  //   console.log("arr", arr);
  if (!arr.length) return 0;
  if (arr.some((a) => a !== 0)) {
    for (let i = 0; i < arr.length - 1; i++) {
      newArr.push(arr[i + 1] - arr[i]);
    }
    return arr[0] - run([...newArr]);
  }
  return 0;
};

const ans = d.reduce((a, b) => a + run(b), 0);
console.log("ans", ans);

/*  
    I think that we need to have a base case where everything is the same ? 
    then we can return that number? 
    once we are on the way back up we can continually add the returned number to the last digit in the array 

*/
