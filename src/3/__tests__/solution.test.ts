import { describe, test } from "node:test";
import assert from "node:assert";
import { solve } from "../solution";

describe("solution", () => {
  test("should be 4361", (t) => {
    assert.equal(solve("src/3/__tests__/testNumbers.txt"), 4361)
  });
});