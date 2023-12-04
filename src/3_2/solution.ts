import fs from "fs";

const symbol = "*";

const isNumber = (char: string) => !isNaN(parseInt(char))

export const getSymbolIndices = (line: string) => {
    const symbolIndices: number[] = [];
    for (let i = 0; i < line.length; i++) {
        if (line[i] === symbol) {
            symbolIndices.push(i);
        }
    }
    return symbolIndices;
}

export const getNumberFromLine = (line: string, indicesToCheck: number[]) => {
    const numbersInRange: number[] = [];
    let cache = "";
    let isInSelectRange = false;
    for (let i = 0; i < line.length; i++) {
        if (isNumber(line[i])) {
            cache = `${cache}${line[i]}`;
            if (indicesToCheck.includes(i)) {
                isInSelectRange = true;
            }
        } else {
            if (isInSelectRange) {
                numbersInRange.push(parseInt(cache));
            }
            cache = "";
            isInSelectRange = false;

        }
    }
    if (isInSelectRange) {
        numbersInRange.push(parseInt(cache));
    }
    return numbersInRange;
}


const getIndicesSearchRanges = (maxLength: number, symbolIndices?: number[]) => {
    const indexToCheck: Set<number> = new Set<number>();
    if (symbolIndices) {
        symbolIndices.forEach((index) => {
            indexToCheck.add(index);
            if (index + 1 < maxLength) {
                indexToCheck.add(index + 1);
            }
            if (index > 0) {
                indexToCheck.add(index - 1);
            }
        });
    }
    return indexToCheck;
}

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

const multiplyUpNumberArray = (numbers: number[]) => {
    if (numbers.length === 0) {
        return 0;
    }
    return numbers.reduce((a, b) => a * b);
};

const getNumberForIndex = (line: string, indexToCheck: number) => {
    const indexRange = [...getIndicesSearchRanges(line.length, [indexToCheck])];
    return getNumberFromLine(line, indexRange);
}

const getSurroundingNumbers = (index: number, lineIndex: number, lines: string[]) => {
    const numbersPreviousLine = lineIndex > 0 ? getNumberForIndex(lines[lineIndex - 1], index) : undefined
    const numbersCurrentLine = getNumberForIndex(lines[lineIndex], index);
    const numbersNextLine = lineIndex < lines.length - 1 ? getNumberForIndex(lines[lineIndex + 1], index) : undefined
    const numbers = [...(numbersPreviousLine || []), ...numbersCurrentLine, ...(numbersNextLine || [])]
    return numbers.length > 1 ? numbers : [];
}
const handleLine = (line: string, lineIndex: number, lines: string[]): number[] => {
    const indicesToCheck = getSymbolIndices(line);

    return indicesToCheck.map((index) => {
        const numbersToCalc = getSurroundingNumbers(index, lineIndex, lines)
        return multiplyUpNumberArray(numbersToCalc);
    });

}

export const solve = (filePath: string): number => {
    const data = getFile(filePath);
    if (data) {
        const lines = data.split("\n");
        const lineNumbers = lines.map((line, index) => handleLine(line, index, lines));
        return addUpNumberArray(lineNumbers.map((lineNumbers) => addUpNumberArray(lineNumbers)));
    }
    return -1;
};
