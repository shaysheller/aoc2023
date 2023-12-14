import * as fs from "fs";

export const parse = (string) => {
  const data = fs.readFileSync(string, "utf-8");
  const result = data.split("\n");
  return result;
};

export const directions = [
  [1, 0], // Down
  [-1, 0], // Up
  [0, 1], // Right
  [0, -1], // Left
];
