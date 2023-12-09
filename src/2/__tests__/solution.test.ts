import { describe, test } from "node:test";
import assert from "node:assert";
import { solve } from "../solution";

describe("solution", () => {
  test("should be 8", () => {
    assert.equal(solve("src/2/__tests__/testNumbers.txt"), 8)
  });
});