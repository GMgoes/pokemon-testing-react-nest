/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { ExecutionContext, CallHandler } from '@nestjs/common';
import { of } from 'rxjs';
import { NotFoundException } from '@nestjs/common';
import { NotFoundInterceptor } from './app.controller';

describe('NotFoundInterceptor tests', () => {
  let interceptor: NotFoundInterceptor;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [NotFoundInterceptor],
    }).compile();

    interceptor = moduleRef.get<NotFoundInterceptor>(NotFoundInterceptor);
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  it('should throw NotFoundException with statusCode 404 when response is undefined', (done) => {
    const context: ExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({}),
        getResponse: () => ({
          statusCode: 404,
        }),
      }),
    } as ExecutionContext;

    const next: CallHandler = {
      handle: () => of(undefined),
    };

    const result = interceptor.intercept(context, next);

    result.subscribe({
      error: (err) => {
        expect(err).toBeInstanceOf(NotFoundException);
        done();
      },
    });
  });
});
