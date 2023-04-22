import { Injectable } from '@nestjs/common';

@Injectable()
export class TestsService {
  getTestCases(id: number) {
    const delay = 1000;
    const mockData = [
      { input: [2, 2], output: 4 },
      { input: [3, 2], output: 97 },
      { input: [8, 4], output: 12 },
    ];
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData);
        console.log(id);
      }, delay);
    });
  }
}
