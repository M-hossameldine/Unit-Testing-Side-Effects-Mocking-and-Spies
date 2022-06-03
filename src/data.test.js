import { describe, it, expect, vi } from 'vitest';

// Spies
/*
 * import 'vi' object in case of 'vitest', import 'jest' object in case of using Jest
 * both 'vi' and 'jest' objects have fn() method with the same attitude
 * fn() method "Spy": it creates an empty function which keep track of any function executions of that functions, it also keep track of the arguments that were provided with those calls
 */

import { generateReportData } from './data';

describe('generateReportData()', () => {
  it('should execute logFn at least once if provided', () => {
    // the spy function - replacement of the side effect, in this case the logFun
    const logger = vi.fn();

    // to find out if logger "spy" is executed
    generateReportData(logger);

    // test that the spy function is called at least once
    expect(logger).toBeCalled();
  });
});
