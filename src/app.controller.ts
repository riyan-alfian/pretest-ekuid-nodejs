import { Controller, Get, Post, Req, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AppDto } from './app.dto';
import { firstValueFrom } from 'rxjs';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string{
    return this.appService.getHello();
  }

  @Post('question_one')
  questionOne(@Body() body: AppDto) {
    return this.appService.questionOne(body.input);
  }

  @Post('question_two')
  questionTwo(@Body() body: AppDto) {
    return this.appService.questionTwo(body.input);
  }

  @Post('question_three')
  questionThree(@Body() body: AppDto) {
    return this.appService.questionThree(body.input);
  }

}
