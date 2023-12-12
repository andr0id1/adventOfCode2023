import {describe, test} from "node:test";
import assert from "node:assert";
import { solve} from "../solution";

describe("solution", () => {


    test("should be 13", () => {
        assert.equal(solve("src/4/__tests__/testNumbers.txt"), 13)
    });

});
