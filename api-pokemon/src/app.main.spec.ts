/* eslint-disable prettier/prettier */
import { bootstrap } from './main';
import { NestFactory } from '@nestjs/core';

describe('Main tests', () => {
  let mockApp: any;

  beforeAll(async () => {
    mockApp = {
      enableCors: jest.fn(),
      listen: jest.fn(),
    };
    NestFactory.create = jest.fn().mockResolvedValue(mockApp);
  });

  it('should mock the bootstrap function', async () => {
    await bootstrap();
  });
});
