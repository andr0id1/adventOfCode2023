import {describe, test} from "node:test";
import assert from "node:assert";
import {getIndicesToCheck, getLineSymbolIndices, getNumberFromLine, getSymbolIndices, solve} from "../solution";

describe("solution", () => {

    test("can get number from bordering index", () => {

        const line = "467..114..";
        const indicesToCheck = [2, 3, 4]

        const result = getNumberFromLine(line, indicesToCheck);

        assert.deepEqual(result, [467])
    })

    test("number is not returned multiple times", () => {

        const line = "467..114..";
        const indicesToCheck = [6, 7, 8]

        const result = getNumberFromLine(line, indicesToCheck);

        assert.deepEqual(result, [114])
    })

    test("multiple number can be returned", () => {

        const line = "467..114..";
        const indicesToCheck = [1, 2, 3, 6, 7, 8]

        const result = getNumberFromLine(line, indicesToCheck);

        assert.deepEqual(result, [467, 114])
    })

    test("indices for symbols in line are correctly returned", () => {
        const line = "..$&..#...";
        const symbolIndices = getSymbolIndices(line);
        assert.deepEqual(symbolIndices, [2, 3, 6])
    });

    test("get indices for line above and below", () => {

        const lines = [
            "$.......$.",
            "..$...#...",
            ".§......%."
        ]

        const {
            previousLineSymbolIndices,
            currentLineSymbolIndices,
            nextLineSymbolIndices
        } = getLineSymbolIndices(lines, 1);

        assert.deepEqual(previousLineSymbolIndices, [0, 8])
        assert.deepEqual(currentLineSymbolIndices, [2, 6])
        assert.deepEqual(nextLineSymbolIndices, [1, 8])
    });

    test("get all indices to check for numbers", () => {


        const indicesToCheck = getIndicesToCheck(10, [0, 8], [2, 6], [1, 8]);
        assert.deepEqual(indicesToCheck, [0, 1, 8, 9, 7, 2, 3, 6, 5])

        const indicesToCheck2 = getIndicesToCheck(10, undefined, [2, 8],);
        assert.deepEqual(indicesToCheck2, [2, 3, 1, 8, 9, 7])

    });

    test("should be 4361", () => {
        assert.equal(solve("src/3/__tests__/testNumbers.txt"), 4361)
    });

});
