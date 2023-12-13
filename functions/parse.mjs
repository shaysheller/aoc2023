import * as fs from "fs";

export const parse = (string) => {
  const data = fs.readFileSync(string, "utf-8");
  const result = data.split("\n");
  return result;
};
