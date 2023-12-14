import { parse } from "./functions/parse.mjs";

const d = parse("day8.txt");
const ds = parse("day8sample.txt");

const run = (data) => {
  let path = data[0];
  const parsed = {};
  data.slice(2).forEach((a) => {
    let key = a.slice(0, 3);
    let code = a
      .slice(7, a.length - 1)
      .replace(",", "")
      .split(" ");
    parsed[key] = {
      left: code[0],
      right: code[1],
    };
  });
  //   return parsed;

  const fword = Object.keys(parsed)
    .filter((a) => a[2] === "A")
    .map((b) => {
      console.log(b);
      return countSteps(b, parsed, path);
    });
  console.log(fword);

  return fword;
};

// plan: need to find an array of all the keys that end with A to start the traversal ->
// every step -> check if all keys in array end in Z if so stop counting
// if not send all those keys to their rightful path

const countSteps = (start, map, path) => {
  let steps = 0;

  let curr = start;
  let length = curr.length;

  while (curr[2] !== "Z") {
    let dir = path[steps % path.length];
    if (dir === "L") {
      curr = map[curr].left;
    } else {
      curr = map[curr].right;
    }
    steps++;
  }
  return steps;
};

function gcd(a, b) {
  if (b == 0) return a;
  return gcd(b, a % b);
}

// Returns LCM of array elements
function findlcm(arr, n) {
  // Initialize result
  let ans = arr[0];

  // ans contains LCM of arr[0], ..arr[i]
  // after i'th iteration,
  for (let i = 1; i < n; i++) ans = (arr[i] * ans) / gcd(arr[i], ans);

  return ans;
}

console.log(run(d));
