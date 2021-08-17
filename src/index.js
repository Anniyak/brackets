module.exports = function check(str, bracketsConfig) {
  let brackets = [];
  let open_brackets = [];
  let brackets_pairs = {};
  bracketsConfig.forEach((pair) => {
    brackets.push(pair[0], pair[1]);
    open_brackets.push(pair[0]);
    brackets_pairs[pair[1]] = pair[0];
  });
  let stack = [];
  for (let i = 0; i < str.length; i++) {
    let current_symbol = str[i];
    if (brackets.indexOf(current_symbol) == -1) return false;
    if (open_brackets.indexOf(current_symbol) > -1 && brackets_pairs[current_symbol] == undefined) {
      stack.push(current_symbol);
    }
    else {
      if (brackets_pairs[current_symbol] == current_symbol) {//символ двойной
        if (!stack.length || stack[stack.length - 1] !== current_symbol) {
          stack.push(current_symbol);
        }
        else stack.pop();
      }
      else {
        if (stack.length && stack[stack.length - 1] == brackets_pairs[current_symbol]) {
          stack.pop();
        }
        else return false;
      }
    }
  }
  return stack.length == 0;

}
