import fs from "fs";


const numberMap: Record<string, number> = {
  "one": 1,
  "two": 2,
  "three": 3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9
};


const addUpNumberArray = (numbers: number[]) => {
  return numbers.reduce((a, b) => a + b);
};

const getCharNumber = (str: string) => {
  if (!isNaN(parseInt(str))) {
    return parseInt(str);
  }
  return undefined;
};

const getWritenNumber = (str: string) => {
  for (const key of Object.keys(numberMap)) {
    if (str.includes(key)) {
      return  numberMap[key];
    }
  }
  return undefined;
};

const findNumberInString = (char: string, combinedChars: string) => {
  const numberChar = getCharNumber(char);
  const writenNumber = getWritenNumber(combinedChars);
  return numberChar || writenNumber;
}

const findFirstNumberInString = (line: string) => {
  let cache = "";
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    cache = `${cache}${char}`;
    const number = findNumberInString(char, cache);
    if (number) {
      return number;
    }
  }
  return undefined;
};

const findLastNumberInString = (line: string) => {
  let cache = "";
  for (let i = line.length - 1; i >= 0; i--) {
    const char = line[i];
    cache = `${char}${cache}`;
    const number = findNumberInString(char, cache);
    if (number) {
      return number;
    }
  }
  return undefined;
};




const getLineNumber = (line: string) => {
  const leftToRightNumber = findFirstNumberInString(line);
  if (leftToRightNumber) {
    const rightToLeftNumber = findLastNumberInString(line);
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
  if (data) {
    const lines = data.split("\r\n");
    const lineNumbers = lines.map((line) => getLineNumber(line));
    return addUpNumberArray(lineNumbers);
  }
  return -1;
};
