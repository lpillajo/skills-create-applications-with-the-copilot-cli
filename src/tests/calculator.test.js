const { add, sub, mul, div } = require('../calculator');

describe('calculator basic operations', () => {
  test('addition of two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('addition of multiple numbers', () => {
    expect(add(1, 2, 3, 4)).toBe(10);
  });

  test('subtraction of two numbers', () => {
    expect(sub(10, 4)).toBe(6);
  });

  test('subtraction with multiple operands', () => {
    expect(sub(20, 5, 3)).toBe(12); // 20 - 5 - 3 = 12
  });

  test('multiplication of two numbers', () => {
    expect(mul(3, 5)).toBe(15);
  });

  test('multiplication with multiple operands', () => {
    expect(mul(2, 3, 4)).toBe(24);
  });

  test('division of two numbers', () => {
    expect(div(9, 3)).toBe(3);
  });

  test('division resulting in fraction', () => {
    expect(div(10, 4)).toBe(2.5);
  });

  test('division with multiple operands', () => {
    expect(div(100, 2, 5)).toBe(10); // 100 / 2 / 5 = 10
  });

  test('division by zero throws', () => {
    expect(() => div(1, 0)).toThrow('division by zero');
  });

  test('invalid operands (non-number) throw', () => {
    expect(() => add(2, NaN)).toThrow(/Invalid numeric operand/);
    expect(() => sub('a', 2)).toThrow(/Invalid numeric operand/);
  });
});
