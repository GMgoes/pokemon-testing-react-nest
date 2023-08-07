/* eslint-disable prettier/prettier */
import { AppService } from './app.service';
import axios from 'axios';

describe('AppService tests', () => {
  let appService: AppService;

  beforeAll(async () => {
    appService = new AppService();
  });

  describe('List', () => {
    it('should return of a array of pokemons', async () => {
      const mockedPokemons = {
        data: { results: [{ id: 1 }, { id: 2 }] },
      };
      axios.get = jest.fn().mockResolvedValue(mockedPokemons);
      const response = await appService.listMany();
      expect(response).toHaveProperty('data');
    });

    it('will not succeed if it does not have the property data', async () => {
      const mockedPokemons = {
        data: [{ id: 1 }, { id: 2 }],
      };
      axios.get = jest.fn().mockResolvedValue(mockedPokemons);
      const response: any = await appService.listMany();
      expect(response.data).not.toHaveLength(0);
      //expect(response).toHaveProperty('data');
      //expect(response).not.toHaveProperty('data.results');
    });
  });

  describe('Specific', () => {
    it('should return one pokemon', async () => {
      const mockedPokemon = {
        data: { id: 1 },
      };
      axios.get = jest.fn().mockResolvedValue(mockedPokemon);
      const response = await appService.listOne('1');
      expect(response).toHaveProperty('data');
    });

    it('will not succeed if it does not have the property data', async () => {
      const mockedPokemon = {};
      axios.get = jest.fn().mockResolvedValue(mockedPokemon);
      const response: any = await appService.listOne('1');
      expect(response).not.toHaveProperty('data');
    });

    it('should return a message in case of a invalid request', async () => {
      axios.get = jest.fn().mockRejectedValue(new Error('Not Found'));
      await appService.listOne('asdasdasdasdasd');
      expect(axios.get).toBeCalled();
    });
  });
});
