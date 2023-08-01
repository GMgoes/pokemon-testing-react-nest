import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  async listMany() {
    const results = await axios.get(
      'https://pokeapi.co/api/v2/pokemon?limit=16&offset=0',
    );
    return JSON.stringify(results.data);
  }

  async listOne(name: string) {
    const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return JSON.stringify(result.data);
  }
}
