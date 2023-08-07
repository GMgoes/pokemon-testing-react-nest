/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController tests', () => {
  let appController: AppController;
  let appService: AppService;

  beforeAll(async () => {
    appService = new AppService();
    appController = new AppController(appService);
  });

  describe('List', () => {
    it('should return of array of the pokemon', async () => {
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
      jest.spyOn(appService, 'listMany').mockResolvedValue(mockedPokemons);
      expect(await appController.listMany()).toBe(mockedPokemons);
    });
  });

  describe('Specific', () => {
    it('should return of the pokemon with id 1', async () => {
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
  });
});
