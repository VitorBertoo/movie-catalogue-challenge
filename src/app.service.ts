import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getHello(): Promise<string> {
    await this.cacheManager.set('cached_item', { key: 42 });
    const cachedItem = await this.cacheManager.get('cached_item');

    console.log(cachedItem);
    return `
      <h1>Book Catalogue API</h1>
      <p>Aplicação funcionando vá para <a href="/api">/api</a> para testar as rotas</p>
    `;
  }
}
