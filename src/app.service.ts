import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getHello(): string {
    return 'Hello World';
  }

  getUSD(amount, currency){

    return this.httpService
      .get(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
      .pipe(
        map((response) => response.data.rates.USD)
      )
  }
}
