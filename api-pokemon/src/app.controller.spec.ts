/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController (e2e)', () => {
  let appController: AppController;
  let appService: AppService;

  beforeAll(async () => {
    appService = new AppService();
    appController = new AppController(appService);
  });

  describe('Lista', () => {
    it('should return of array of the pokemon', async () => {
      const result = { results: [{ id: 1 }, { id: 2 }] };
      jest.spyOn(appService, 'listMany').mockResolvedValue(result);
      expect(await appController.listMany()).toBe(result);
    });
  });

  describe('Detalhe', () => {
    it('should return of the pokemon with id 1', async () => {
      const result = { result: { id: 1 } };
      jest.spyOn(appService, 'listOne').mockResolvedValue(result);
      expect(await appController.listOne('1')).toBe(result);
    });
  });
});
