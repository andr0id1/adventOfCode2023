import { describe, test } from "node:test";
import assert from "node:assert";
import { solve } from "../solution";

describe("solution", () => {
  test("should be 142", (t) => {
    assert.equal(solve("src/1/__tests__/testNumbers.txt"), 142)
  });
});