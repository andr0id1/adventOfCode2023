import fs from "fs";


const getFile = (filePath: string) => {
    try {
        return fs.readFileSync(filePath, "utf8");
    } catch (e) {
        console.log(`Error reading file from ${filePath}`);
        return undefined;
    }
};

const addUpNumberArray = (numbers: number[]) => {
    if (numbers.length === 0) {
        return 0;
    }
    return numbers.reduce((a, b) => a + b);
};


const getNumberOfMatches = (winningNumbers: RegExpMatchArray, selectedNumbers: RegExpMatchArray) => {
    return selectedNumbers.filter((number) => winningNumbers.includes(number)).length;
}

const splitUpLine = (line: string) => {
    const cardNumberAndNumbers = line.split(":");
    const numbers = cardNumberAndNumbers[1];
    const winningNumbersAndSelectedNumbers = numbers.split("|");
    const winningNumbers = winningNumbersAndSelectedNumbers[0];
    const selectedNumbers = winningNumbersAndSelectedNumbers[1];

    const numberMatch = /\d+/g

    return {
        winningNumbers: winningNumbers.match(numberMatch),
        selectedNumbers: selectedNumbers.match(numberMatch)
    }
}
const handleLine = (line: string): number => {
    if (line) {
        const {winningNumbers, selectedNumbers} = splitUpLine(line);
        if (winningNumbers && selectedNumbers) {
            const matches = getNumberOfMatches(winningNumbers, selectedNumbers);
            return matches === 0 ? 0 : Math.pow(2, matches - 1);
        }
    }
    return 0;
}

export const solve = (filePath: string): number => {
    const data = getFile(filePath);
    if (data) {
        const lines = data.split("\n");
        const lineNumbers = lines.map((line, index) => handleLine(line));
        return addUpNumberArray(lineNumbers);
    }
    return -1;
};
