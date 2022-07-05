import { Controller, Get, Post, Req, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AppDto } from './app.dto';
import { firstValueFrom } from 'rxjs';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // constructor(private readonly httpService: HttpService) {}

  @Get()
  getHello(): string{
    return this.appService.getHello();
  }

  @Post('question_one')
  questionOne(@Body() body: AppDto) {
    let arrayInput = body.input;
    let lengthInput = body.input.length;

    let newData = [];
    let start = 0;
    let end = 0;

    for(let i = 0; i < lengthInput; i++){ // Slicing Array
      end ++;
      if(arrayInput[i+1] < arrayInput[i]){
        newData = [...newData, arrayInput.slice(start, end)];

        start = i + 1;
      }
    }

    newData = [...newData, arrayInput.slice(start, end)]; // Last data

    let result = [];
    for(let i = 0; i < newData.length; i++){ //Get Median and Mean
      const mean = newData[i].reduce((a, b) => a + b, 0) / newData[i].length;
      const middle = Math.floor(newData[i].length / 2);
      const median = newData[i].length % 2 === 0 ? ((newData[i][middle - 1] + newData[i][middle]) / 2) : newData[i][middle];
      
      result = [...result, Object.assign({}, {"mean":mean, "median":median})]
    }

    return result;
  }

  @Post('question_two')
  questionTwo(@Body() body: AppDto) {

    let usd = [];
    for(let i = 0; i < body.input.length; i++){
      const amount = body.input[i]['amount'];
      const currency = body.input[i]['currency'];

      
      let usdAmount = this.appService.getUSD(amount, currency);

      usd = [...usd, usdAmount];
    }

    return usd;
  }

}
