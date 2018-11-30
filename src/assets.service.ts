import { Injectable } from '@nestjs/common';
import * as BigchainDB from 'bigchaindb-driver';
import { AppService } from './app.service';

const painting = {
  name: 'Meninas',
  author: 'Diego Rodríguez de Silva y Velázquez',
  place: 'Madrid',
  year: '1656',
};
@Injectable()
export class AssetsService {
  constructor(private appService: AppService) {}

  createPaint(): Promise<any> {
    const metaInfo = {
      datetime: new Date().toString(),
      location: 'Madrid',
      value: {
        value_eur: '25000000€',
        value_btc: '2200',
      },
    };
    return this.appService.makeTranscationAndCommit(painting, metaInfo);
  }
}
