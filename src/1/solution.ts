import fs from "fs";
import path from "path";

const addUpNumberArray = (numbers: number[]) => {
  return numbers.reduce((a, b) => a + b);
}

const reverseString = (str: string) => {
  return str.split("").reverse().join("");
};

const findFirstNumberInString = (line: string) => {
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (!isNaN(parseInt(char))) {
      return char;
    }
  }
  return undefined;
};


const getLineNumber = (line: string) => {
  const leftToRightNumber = findFirstNumberInString(line);
  if (leftToRightNumber) {
    const rightToLeftNumber = findFirstNumberInString(reverseString(line));
    if (rightToLeftNumber) {
      return parseInt(`${leftToRightNumber}${rightToLeftNumber}`);
    }
  }
  return 0;
};


const getFile = (filePath: string) => {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (e) {
    console.log(`Error reading file from ${filePath}`);
    return undefined;
  }
};


export const solve = (filePath: string): number => {
  const data = getFile(filePath);
  console.log("run solve");
  if (data) {
    const lines = data.split("\r\n");
    const lineNumbers = lines.map((line) => getLineNumber(line));
    return addUpNumberArray(lineNumbers);
  }
  return -1;
};




