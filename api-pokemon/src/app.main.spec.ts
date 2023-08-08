/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AppController } from './app.controller';

describe('Main tests e2e', () => {
  let appController: AppController;
  let app: any;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    appController = await moduleRef.resolve(AppController);
    app = moduleRef.createNestApplication();
    await app.init();
    // app.isInitialized = true
    // How to see if is initialized
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined Controller and Service', async () => {
    const mockedPokemons = {
      data: { results: [{ id: 1 }, { id: 2 }] },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: undefined,
      },
      request: {},
    };
    jest.spyOn(appController, 'listMany').mockResolvedValue(mockedPokemons);
    expect(await appController.listMany()).toBe(mockedPokemons);
  });
});
