// jest.mock('fs')
import { describe, it, expect, vi } from 'vitest';

import writeData from './io';
import { promises as fs } from 'fs';
/*
 * mock() method: takes that name or the path of the module as a first argument
 * works with both built-in or third-party modules and also with you with your own modules
 * This will kick of auto-mocking algorithm, it will basically find this module and replace all the functions in there with empty spy functions
 * mock() exists in both 'vitest' and 'jest' by import 'vi' or 'jest' objects respectively
 * vi.mock() is hoisted automatically to the top of the file
 * jest.mock() is not hoisted automatically to the top of the file so you should call it at the first line of your code
 */

// create empty spy functions for 'fs' module functions
vi.mock('fs');
// create custom mocking logic (Spy function but with behavior)
vi.mock('path', () => {
  return {
    default: {
      join: (...args) => {
        return args[args.length - 1];
      },
    },
  };
});

describe('writeData()', () => {
  it('should execute writeFile just for once', () => {
    const testData = 'Test';
    const testFileName = 'test.txt';

    writeData(testData, testFileName);

    expect(fs.writeFile).toBeCalledTimes(1);
  });

  it('should execute the writeFile method', () => {
    const testData = 'Test';
    const testFileName = 'test.txt';

    writeData(testData, testFileName);

    expect(fs.writeFile).toBeCalled();
  });

  it('should return a promise that resolves when called correctly', () => {
    const testData = 'Test';
    const testFileName = 'test.txt';

    // without using mocking this would have a side effect and create a test file in data folder
    return expect(writeData(testData, testFileName)).resolves.toBeUndefined();
  });

  it('should execute writeFile with correct arguments', () => {
    const testData = 'Test';
    const testFileName = 'test.txt';

    writeData(testData, testFileName);

    expect(fs.writeFile).toBeCalledWith(testFileName, testData);
  });
});
