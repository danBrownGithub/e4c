const max = require("./function");

test("compares 1 and 2 to return 2", () => {
  expect(max(1, 2)).toBe(2);
}); 

test("compares 5 and 5 to return 5", () => {
  expect(max(5, 5)).toBe(5);
}); 

test("tries to compare non-number and throws error", () => {
  expect(() => {
    max(1, "two");
  }).toThrow();
}); 