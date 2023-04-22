import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestsService } from './tests.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, TestsService],
})
export class AppModule {}
