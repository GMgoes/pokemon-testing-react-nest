import {
  CallHandler,
  Controller,
  ExecutionContext,
  Get,
  Injectable,
  NestInterceptor,
  NotFoundException,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, tap } from 'rxjs';

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((data) => {
        if (data === undefined) throw new NotFoundException();
      }),
    );
  }
}

@Controller('/pokemons')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async listMany() {
    return await this.appService.listMany();
  }

  @Get(':name')
  @UseInterceptors(NotFoundInterceptor)
  async listOne(@Param('name') name: string) {
    return await this.appService.listOne(name);
  }
}
