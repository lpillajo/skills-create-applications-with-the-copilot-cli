#!/usr/bin/env node

// calculator.js
// Node.js CLI calculator
// Supported operations:
//  - add : addition
//  - sub : subtraction
//  - mul : multiplication
//  - div : division

'use strict';

const [,, cmd, ...args] = process.argv;

function printUsage() {
  console.log('Usage: node src/calculator.js <operation> <num1> <num2> [num3 ...]');
  console.log('Operations: add, sub, mul, div');
  console.log('\nExamples:');
  console.log('  node src/calculator.js add 2 3        # -> 5');
  console.log('  node src/calculator.js sub 10 4      # -> 6');
  console.log('  node src/calculator.js mul 3 5       # -> 15');
  console.log('  node src/calculator.js div 9 3       # -> 3');
}

function isNumeric(s) {
  return !Number.isNaN(Number(s));
}

if (!cmd) {
  console.error('Error: missing operation.');
  printUsage();
  process.exit(1);
}

const op = cmd.toLowerCase();
if (['add','sub','mul','div'].indexOf(op) === -1) {
  console.error(`Error: unknown operation '${cmd}'.`);
  printUsage();
  process.exit(1);
}

if (args.length < 2) {
  console.error('Error: at least two numeric operands are required.');
  printUsage();
  process.exit(1);
}

const nums = args.map((a) => {
  if (!isNumeric(a)) {
    console.error(`Error: invalid numeric operand '${a}'.`);
    process.exit(1);
  }
  return Number(a);
});

let result;
switch (op) {
  case 'add':
    // addition: sum all operands
    result = nums.reduce((acc, n) => acc + n, 0);
    break;
  case 'sub':
    // subtraction: left-associative (n1 - n2 - n3 ...)
    result = nums.reduce((acc, n) => acc - n);
    break;
  case 'mul':
    // multiplication: multiply all operands
    result = nums.reduce((acc, n) => acc * n, 1);
    break;
  case 'div':
    // division: left-associative (n1 / n2 / n3 ...)
    // check division by zero at each step
    result = nums.reduce((acc, n, idx) => {
      if (idx > 0 && n === 0) {
        console.error('Error: division by zero');
        process.exit(1);
      }
      return acc / n;
    });
    break;
  default:
    console.error('Error: unsupported operation');
    process.exit(1);
}

// Print result (if integer, print without trailing .0)
if (Number.isInteger(result)) {
  console.log(result);
} else {
  console.log(result);
}

process.exit(0);
