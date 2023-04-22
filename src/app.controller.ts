import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

export interface Exercise {
  id: number;
  code: string;
  language: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async validateResult(@Body() exercise: Exercise): Promise<string> {
    const result = await this.appService.validate(exercise);
    return result;
  }
}
