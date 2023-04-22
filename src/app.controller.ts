import { Body, Controller, Param, Get, Post } from '@nestjs/common';
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
  async validateResult(@Body() exercise: Exercise): Promise<any> {
    const result = await this.appService.validateExercise(exercise);
    return result;
  }

  @Get(':id')
  async getOneExercise(@Param('id') id: number): Promise<any> {
    const result = await this.appService.getOneExercise(id);
    return result;
  }
}
