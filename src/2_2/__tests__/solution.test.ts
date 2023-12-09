import { describe, test } from "node:test";
import assert from "node:assert";
import { solve } from "../solution";

describe("solution", () => {
  test("should be 2286", () => {
    assert.equal(solve("src/2_2/__tests__/testNumbers.txt"), 2286)
  });
});