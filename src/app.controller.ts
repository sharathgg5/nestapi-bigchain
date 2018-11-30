import { Get, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { AssetsService } from './assets.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private assetsService: AssetsService,
  ) {}

  @Get()
  root(): Promise<any> {
    return this.assetsService.createPaint();
  }

  /** localhost:3000/all */
  @Get('all')
  all(): string[] {
    return ['sharath', 'rajat', 'arun'];
  }
}
