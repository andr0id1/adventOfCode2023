import fs from "fs";

const symbols = ["+", "-", "*", "/", "(", ")", "@", "&", "%", "$", "#", "!", "?", ":", ";", "=", "§"];


const isNumber = (char: string) => !isNaN(parseInt(char))

const isSymbol = (char: string) => symbols.includes(char);

export const getSymbolIndices = (line: string) => {
    const symbolIndices: number[] = [];
    for (let i = 0; i < line.length; i++) {
        if (isSymbol(line[i])) {
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

export const getIndicesToCheck = (maxLength: number, symbolIndicesTopLine?: number[], symbolIndicesCurrentLine?: number[], symbolIndicesBottomLine?: number[]) => {
    const topLineIndices = getIndicesSearchRanges(maxLength, symbolIndicesTopLine);
    const currentLineIndices = getIndicesSearchRanges(maxLength, symbolIndicesCurrentLine);
    const bottomLineIndices = getIndicesSearchRanges(maxLength, symbolIndicesBottomLine);
    return [...(new Set<number>([...topLineIndices, ...currentLineIndices, ...bottomLineIndices]))];
}


const getFile = (filePath: string) => {
    try {
        return fs.readFileSync(filePath, "utf8");
    } catch (e) {
        console.log(`Error reading file from ${filePath}`);
        return undefined;
    }
};


export const getLineSymbolIndices = (lines: string[], currentIndex: number) => {
    const previousLineSymbolIndices = currentIndex === 0 ? undefined : getSymbolIndices(lines[currentIndex - 1]);
    const currentLineSymbolIndices = getSymbolIndices(lines[currentIndex]);
    const nextLineSymbolIndices = currentIndex === lines.length - 1 ? undefined : getSymbolIndices(lines[currentIndex + 1]);

    return {
        previousLineSymbolIndices,
        currentLineSymbolIndices,
        nextLineSymbolIndices
    }
}

const addUpNumberArray = (numbers: number[]) => {
    if (numbers.length === 0) {
        return 0;
    }
    return numbers.reduce((a, b) => a + b);
};


const handleLine = (line: string, lineNumber: number, lines: string[]): number[] => {

    const {
        previousLineSymbolIndices,
        currentLineSymbolIndices,
        nextLineSymbolIndices
    } = getLineSymbolIndices(lines, lineNumber);

    const linesToCheck = getIndicesToCheck(line.length, previousLineSymbolIndices, currentLineSymbolIndices, nextLineSymbolIndices);


    return getNumberFromLine(line, linesToCheck);

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
