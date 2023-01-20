import { queryString, parse } from './queryStrings';
describe('Object to query string', () => {
  it('should create a valid query string when an object is provided', () => {
    const obj = {
      name: 'Natalia',
      profession: 'Developer',
    };

    expect(queryString(obj)).toBe('name=Natalia&profession=Developer');
  });

  it('should create a valid query even when an array is passed as value', () => {
    const obj = {
      name: 'Natalia',
      abilities: ['JS', 'TDD'],
    };

    expect(queryString(obj)).toBe('name=Natalia&abilities=JS,TDD');
  });

  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'Natalia',
      abilities: {
        first: 'JS',
        second: 'TDD',
      },
    };

    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});

describe('Query string to object', () => {
  it('should convert a query string to object', () => {
    const qs = 'name=Natalia&profession=Developer';

    expect(parse(qs)).toEqual({
      name: 'Natalia',
      profession: 'Developer',
    });
  });

  it('should convert a query string of a single key=value to object', () => {
    const qs = 'name=Natalia';

    expect(parse(qs)).toEqual({
      name: 'Natalia',
    });
  });

  it('should convert a query string to an object taking care of comma separated values', () => {
    const qs = 'name=Natalia&abilities=JS,TDD';

    expect(parse(qs)).toEqual({ name: 'Natalia', abilities: ['JS', 'TDD'] });
  });
});
