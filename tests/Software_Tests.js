// 1. Return string with all vowels removed


// 2. Multiply two integers
function max(a, b) {
    if (typeof a != "number" || typeof b != "number") {
      throw "Invalid type";
    }
    if (a > b) {
      return a;
    } else {
      return b;
    } 
  } 
  module.exports = max;