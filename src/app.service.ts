import { Inject, Injectable } from '@nestjs/common';
import { Exercise } from './app.controller';
import { TestsService } from './tests.service';
import * as vm from 'vm';

@Injectable()
export class AppService {
  constructor(@Inject(TestsService) private testsService: TestsService) {}

  async validate(exercise: Exercise): Promise<any> {
    const tests: any = await this.testsService.getTestCases(exercise.id);
    const results = [];

    for (const testCase of tests) {
      const context = { testCase };

      vm.createContext(context);

      const result = vm.runInContext(exercise.code, context);

      results.push({
        expected: testCase.output,
        userOutput: result,
        passed: testCase.output === result,
      });
    }

    return results;
  }
}
