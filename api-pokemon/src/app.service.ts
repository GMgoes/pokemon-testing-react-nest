import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  async listMany() {
    return await axios.get(
      'https://pokeapi.co/api/v2/pokemon?limit=16&offset=0',
    );
  }

  async listOne(name: string) {
    return await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => response)
      .catch(() => {
        //console.error(error.message);
      });
  }
}
