/* eslint-disable prettier/prettier */
import { AppService } from './app.service';
import axios from 'axios';

describe('AppService (e2e)', () => {
  let appService: AppService;

  beforeAll(async () => {
    appService = new AppService();
  });

  describe('Lista', () => {
    it('should return of a array of pokemons', async () => {
      const mockedPokemons = {
        data: { results: [{ id: 1 }, { id: 2 }] },
      };
      axios.get = jest.fn().mockResolvedValue(mockedPokemons);

      const response = await appService.listMany();
      expect(response).toHaveProperty('results');
    });
  });

  describe('Detalhe', () => {
    it('should return one pokemon', async () => {
      const mockedPokemon = {
        data: { id: 1 },
      };
      axios.get = jest.fn().mockResolvedValue(mockedPokemon);

      const response = await appService.listOne('1');
      expect(response).toHaveProperty('id');
    });
  });
});
