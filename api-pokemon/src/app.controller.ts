import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/pokemons')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async listMany() {
    return await this.appService.listMany();
  }

  @Get(':name')
  async listOne(@Param('name') name: string) {
    return await this.appService.listOne(name);
  }
}
