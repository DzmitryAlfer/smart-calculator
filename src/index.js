const OPERATION_ADD = '+';
const OPERATION_SUBS = '-';
const OPERATION_MULT = '*';
const OPERATION_DIV = '/';
const OPERATION_POW = '^';

const OPERATIONS = [OPERATION_ADD, OPERATION_SUBS, OPERATION_MULT, OPERATION_DIV, OPERATION_POW];

class SmartCalculator {
  constructor (initialValue) {
    this._output = [];

    this._operations = [];

    // priorities
    // 3 : ^
    // 2 : *, /
    // 1 : +, -
    this._priorities = new Map([[OPERATION_ADD, 1], [OPERATION_SUBS, 1], [OPERATION_MULT, 2], [OPERATION_DIV, 2], [OPERATION_POW, 3]]);
    this._output.push(initialValue);
  }

  _executeOperations(output) {
    const stack = [];

    for (let val of output) {
      if (!OPERATIONS.includes(val)) {
        stack.push(val);
      } else {
        const a = stack.pop();
        const b = stack.pop();
        let summ;

        switch (val) {
          case OPERATION_ADD:
            summ = a + b;
            break;

          case OPERATION_SUBS:
            summ = b - a;
            break;

          case OPERATION_MULT:
            summ = b * a;
            break;

          case OPERATION_DIV:
            summ = b / a;
            break;

          case OPERATION_POW:
            summ = Math.pow(b, a);
            break;
        }

        stack.push(summ);
      }
    }

    return stack.pop();
  }

  _applyOperation(number, operation) {
    const operationPriority = this._priorities.get(operation);

    if (this._operations.length === 0) 
    {
      this._operations.push(operation);
      this._output.push(number);

      return this;
    }

    const prevOperationPriority = this._priorities.get(this._operations[0]);//[this._operations[0]];

    if (prevOperationPriority < operationPriority) {
      this._operations.push(operation);
      this._output.push(number);

      return this;
    }

    while(this._operations.length > 0 && operationPriority <= this._priorities.get(this._operations[0])) {
      this._output.push(this._operations.pop());
    }

    this._operations.push(operation);
    this._output.push(number);

    return this;
  }

  add(number) {
    return this._applyOperation(number, OPERATION_ADD);
  }

  subtract(number) {
    return this._applyOperation(number, OPERATION_SUBS);
  }

  multiply(number) {
    return this._applyOperation(number, OPERATION_MULT);
  }

  devide(number) {
    return this._applyOperation(number, OPERATION_DIV);
  }

  pow(number) {
    return this._applyOperation(number, OPERATION_POW);
  }

  

  toString() {
    while (this._operations.length > 0) {
      this._output.push(this._operations.pop());
    }

    return this._executeOperations(this._output) + '';
  }
}

module.exports = SmartCalculator;
