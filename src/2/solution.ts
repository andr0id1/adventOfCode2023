import fs from "fs";

const addUpNumberArray = (numbers: number[]) => {
  return numbers.reduce((a, b) => a + b);
};


const findNumberInString = (line: string) => {
  let numberCache = ""
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (!isNaN(parseInt(char))) {
      numberCache = `${numberCache}${char}`;
    }
  }
  return !!numberCache ? numberCache : undefined
};


const getRoundResults = (roundResults: string) => {
  let blueCount = 0;
  let redCount = 0;
  let greenCount = 0;

  const results = roundResults.split(",");
  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const count = findNumberInString(result);
    if (count) {
      if (result.includes("blue")) {
        blueCount = blueCount + parseInt(count);
      } else if (result.includes("red")) {
        redCount = redCount + parseInt(count);
      } else if (result.includes("green")) {
        greenCount = greenCount + parseInt(count);
      }
    }
  }


  return {
    roundBlueCount: blueCount,
    roundRedCount: redCount,
    roundGreenCount: greenCount
  };
};

const getGameResults = (gameResults: string) => {

  let blueCount = 0;
  let redCount = 0;
  let greenCount = 0;

  const results = gameResults.split(";");

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const { roundBlueCount, roundRedCount, roundGreenCount } = getRoundResults(result);
    blueCount = Math.max(blueCount,roundBlueCount);
    redCount = Math.max(redCount,roundRedCount);
    greenCount = Math.max(greenCount,roundGreenCount);
  }

  return {
    blueCount,
    redCount,
    greenCount
  };
};

const isValidGame = (gameResults: string): boolean => {
  const red = 12;
  const green = 13;
  const blue = 14;

  const { blueCount, redCount, greenCount } = getGameResults(gameResults);
  return !(blueCount > blue || redCount > red || greenCount > green);

};


const getValidLineGameNumber = (line: string) => {

  const gameAndResults = line.split(":");
  const game = gameAndResults[0];
  const gameCount = findNumberInString(game);
  const results = gameAndResults[1];

  if (gameCount && isValidGame(results)) {
    return parseInt(gameCount);
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
    const lineNumbers = lines.map((line) => getValidLineGameNumber(line));
    return addUpNumberArray(lineNumbers);
  }
  return -1;
};




