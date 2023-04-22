import { Inject, Injectable } from '@nestjs/common';
import { Exercise } from './app.controller';
import { TestsService } from './tests.service';
import * as vm from 'vm';

@Injectable()
export class AppService {
  constructor(@Inject(TestsService) private testsService: TestsService) {}

  async validateExercise(exercise: Exercise): Promise<any> {
    const tests: any = await this.testsService.getTestCases(exercise.id);
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
}
