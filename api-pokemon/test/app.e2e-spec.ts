import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/pokemons (GET)', async () => {
    const result = await request(app.getHttpServer()).get('/pokemons');
    expect(JSON.parse(result.text)).toHaveProperty('results');
  });

  it('/pokemons/1 (GET)', async () => {
    const result = await request(app.getHttpServer()).get('/pokemons/1');
    expect(JSON.parse(result.text)).toHaveProperty('id');
  });
});
