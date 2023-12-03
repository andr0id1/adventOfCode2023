import fs from "fs";

const symbols = ["+", "-", "*", "/", "(", ")", "§", "$", "%", "&", "!", "?", ":", ";", "@", "#", "~", "^", "<", ">", "|", "_", "{", "}", "[", "]", "=", "€", "£", "¥", "¢", "¤", "µ", "§", "°", "²", "³", "¹", "¼", "½", "¾", "±", "×", "÷", "©", "®", "™", "´", "`", "¨", "¯", "ˆ", "˜", "˚", "˙"];


const getFullNumberForIndex = (index: number, line: string) => {

}


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

const getIndizesToCheck = (symbolIndizesTopLine?: number[], symbolIndizesCurrentLine?: number[], symbolIndizesBottomLine?: number[]) => {

}



export const solve = (filePath: string): number => {
  const data = getFile(filePath);
  if (data) {
    const lines = data.split("\r\n");
    const indizesToCheck: number[] = [];
    const lineNumbers = lines.map((line) => getLineNumber(line));
    return addUpNumberArray(lineNumbers);
  }
  return -1;
};
