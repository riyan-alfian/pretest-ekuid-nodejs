import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import { resourceLimits } from 'worker_threads';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getHello(): string {
    return 'Hello World';
  }

  questionOne(arrayData){

    let lengthInput = arrayData.length;
    const newData = this.slicingArray(arrayData, lengthInput);

    let result = [];
    for(let i = 0; i < newData.length; i++){ //Get Median and Mean
      const mean = newData[i].reduce((a, b) => a + b, 0) / newData[i].length;
      const middle = Math.floor(newData[i].length / 2);
      const median = newData[i].length % 2 === 0 ? ((newData[i][middle - 1] + newData[i][middle]) / 2) : newData[i][middle];
      
      result = [...result, Object.assign({}, {"mean":mean, "median":median})]
    }

    return result;
  }

  async questionTwo(arrayData){
    let result = [];

    for(let i = 0; i < arrayData.length; i++){

      const amount = arrayData[i]['amount'];
      const currency = arrayData[i]['currency'];

      const apiData = await this.getUSD(amount, currency);
      if(apiData.statusCode !== 200) return 'Error API USD'

      const amountUSD = parseFloat(apiData.data.rates.USD.toFixed(1));

      result = [...result, amountUSD];
    }

    return result;
  }

  questionThree(arrayData){
    const price = arrayData[0];
    const qtyMoney = arrayData[1];
    const money = [100, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000];
    
    let result = [];
    let total = 0

    while (total !== price) {
      result = [];
      for(let i = 0; i < qtyMoney; i++){
        const randomItem = money[Math.floor(Math.random()*money.length)];
        result = [...result, randomItem];
      }

      total = result.reduce((a, b) => a + b, 0)
    }

    return result;
  }
  
  slicingArray(arrayData, lengthInput){
    let newData = [];
    let start = 0;
    let end = 0;

    for(let i = 0; i < lengthInput; i++){ // Slicing Array
      end ++;
      if(arrayData[i+1] < arrayData[i]){
        newData = [...newData, arrayData.slice(start, end)];

        start = i + 1;
      }
    }

    newData = [...newData, arrayData.slice(start, end)]; // Last data

    return newData;
  }

  async getUSD(amount, currency){

    const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`;
    const request = await (await axios.get(url));
    const data = request.data;

    if (data) {
      return {
          statusCode: 200,
          data
      }
    }

    return {
        statusCode: 400,
        data
    };
  }
}
