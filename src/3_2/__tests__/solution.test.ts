import {describe, test} from "node:test";
import assert from "node:assert";
import { solve} from "../solution";

describe("solution", () => {


    test("should be 467835", () => {
        assert.equal(solve("src/3_2/__tests__/testNumbers.txt"), 467835)
    });

});
