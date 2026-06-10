#!/usr/bin/env node

// calculator.js
// Node.js CLI calculator
// Supported operations:
//  - add : addition
//  - sub : subtraction
//  - mul : multiplication
//  - div : division

'use strict';

// Arithmetic functions are exported for programmatic use and unit testing.
function validateNumbers(nums) {
  if (!Array.isArray(nums) || nums.length < 2) {
    throw new Error('At least two numeric operands are required');
  }
  nums.forEach((n) => {
    if (typeof n !== 'number' || Number.isNaN(n)) {
      throw new Error(`Invalid numeric operand: ${n}`);
    }
  });
}

function add(...nums) {
  validateNumbers(nums);
  return nums.reduce((acc, n) => acc + n, 0);
}

function sub(...nums) {
  validateNumbers(nums);
  return nums.reduce((acc, n) => acc - n);
}

function mul(...nums) {
  validateNumbers(nums);
  return nums.reduce((acc, n) => acc * n, 1);
}

function div(...nums) {
  validateNumbers(nums);
  return nums.reduce((acc, n, idx) => {
    if (idx > 0 && n === 0) {
      throw new Error('division by zero');
    }
    return acc / n;
  });
}

function printUsage() {
  console.log('Usage: node src/calculator.js <operation> <num1> <num2> [num3 ...]');
  console.log('Operations: add, sub, mul, div');
}

function runCLI(argv = process.argv.slice(2)) {
  const [cmd, ...args] = argv;
  if (!cmd) {
    console.error('Error: missing operation.');
    printUsage();
    process.exit(1);
  }
  const op = cmd.toLowerCase();
  if (!['add', 'sub', 'mul', 'div'].includes(op)) {
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
    const n = Number(a);
    if (Number.isNaN(n)) {
      console.error(`Error: invalid numeric operand '${a}'.`);
      process.exit(1);
    }
    return n;
  });

  try {
    let result;
    switch (op) {
      case 'add':
        result = add(...nums);
        break;
      case 'sub':
        result = sub(...nums);
        break;
      case 'mul':
        result = mul(...nums);
        break;
      case 'div':
        result = div(...nums);
        break;
      default:
        console.error('Error: unsupported operation');
        process.exit(1);
    }
    console.log(result);
    process.exit(0);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

// Export functions for testing and programmatic use
module.exports = { add, sub, mul, div, runCLI };

// Run as CLI when executed directly
if (require.main === module) {
  runCLI();
}
