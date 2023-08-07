/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppModule tests', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
    appService = moduleRef.get<AppService>(AppService);
  });

  it('should be defined Controller and Service', () => {
    expect(appController).toBeDefined();
    expect(appService).toBeDefined();
  });
});
