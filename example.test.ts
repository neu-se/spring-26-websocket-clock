import { describe, expect, it } from 'vitest';

describe('example tests', () => {
  it('can test for specific values', () => {
    expect(1 + 4).toBe(5);
  });

  it('can test structures and arrays', () => {
    expect({ a: 4, b: 'hi' }).toStrictEqual({ b: 'hi', a: 4 });
    expect([1, 2, 'a']).toStrictEqual([1, 2, 'a']);
    expect({ a: null }).not.toStrictEqual({ a: null, b: undefined });
  });

  it('can test that expressions throw errors', () => {
    expect(() => {
      throw new Error();
    }).toThrowError();
  });
});
