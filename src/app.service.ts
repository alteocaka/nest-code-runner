import { Inject, Injectable } from '@nestjs/common';
import { Exercise } from './app.controller';
import { TestsService } from './tests.service';
import * as vm from 'vm';
import * as VM from 'vm2';

type Input = {
  [property: string]: any;
};

@Injectable()
export class AppService {
  constructor(@Inject(TestsService) private testsService: TestsService) {}

  async validateExercise(exercise: Exercise): Promise<any> {
    const tests: any = await this.testsService.getTestCases(exercise.id);

    if (exercise.language === 'javascript') {
      const results = [];

      for (const testCase of tests) {
        const context = { testCase };

        vm.createContext(context);

        try {
          const result = vm.runInContext(exercise.code, context);

          results.push({
            expected: testCase.output,
            userOutput: result,
            passed: testCase.output === result,
          });
        } catch (error) {
          return error.toString();
        }
      }
      return results;
    }
    if (exercise.language === 'python') {
      const code = `add_numbers(x, y)`;

      const inputs = [
        [1, 2],
        [4, 5],
        [10, 20]
      ];

      const expectedOutputs = [  "3",  "9",  "30"];
      const results = [];
      for (const testCase of tests) {
        const result = this.testPythonCode(code, inputs, expectedOutputs);
        console.log(result);
        results.push({
          expected: testCase.output,
          userOutput: result,
          passed: testCase.output === result,
        });
      }
      return results;
    }
  }

  async getOneExercise(id: number) {
    const delay = 1000;
    const mockData = {
      name: 'Add Two Integers',
      description:
        'Given two integers num1 and num2, return the sum of the two integers.',
      starterCode:
        '/**  * @param {number} num1  * @param {number} num2  * @return {number}  */ var sum = function(num1, num2) {      };',
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData);
        console.log(id);
      }, delay);
    });
  }

  testPythonCode(
    code: string,
    inputs: any[],
    expectedOutputs: string[],
  ): boolean[] {
    const testCount = inputs.length;
    const results: boolean[] = [];

    const sandbox = {
      add_numbers: (x: number, y: number) => x + y,
    };

    const context = vm.createContext(sandbox);

    for (let i = 0; i < testCount; i++) {
      const input = inputs[i];
      const expectedOutput = expectedOutputs[i];

      const testCode = `
      result = ${code}(${input})
      console.log(result)
    `;

      try {
        vm.runInContext(testCode, context);
        const actualOutput = context.result.toString();
        const testResult = actualOutput === expectedOutput;
        results.push(testResult);
      } catch (error) {
        console.error(`Error: ${error.message}`);
        results.push(false);
      }
    }

    return results;
  }
}
