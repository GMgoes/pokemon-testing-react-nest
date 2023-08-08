/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppModule tests', () => {
  let appController: AppController;
  let appService: AppService;
  //let appService1: AppService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    appService = await moduleRef.resolve(AppService);
    appController = await moduleRef.resolve(AppController);
    //appController= moduleRef.get<AppController>(AppController);
    //appService = moduleRef.get<AppService>(AppService);
    //appService1 = await moduleRef.resolve(AppService);
    //console.log(appController);
  });

  it('should be defined Controller and Service', () => {
    expect(appController).toBeDefined();
    expect(appService).toBeDefined();
  });

  it("a controller's listOne function must communicate with the service's listOne function", async () => {
    const mockedPokemon = {
      data: { id: 1 },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: undefined,
      },
      request: {},
    };
    jest.spyOn(appService, 'listOne').mockResolvedValue(mockedPokemon);
    expect(await appController.listOne('1')).toBe(mockedPokemon);
  });

  it("a service's listOne function must be called once", async () => {
    const mockedPokemon = {
      data: { id: 1 },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: undefined,
      },
      request: {},
    };
    jest.spyOn(appService, 'listOne').mockResolvedValue(mockedPokemon);
    expect(await appService.listOne('1')).toBe(mockedPokemon);
  });
});
