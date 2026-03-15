import { Controller, Get } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Controller('test/connection-pool')
export class PoolTestController {
  constructor(private readonly dataSource: DataSource) {}

  @Get()
  async testPool() {
    const queries = Array.from({ length: 20 }, () =>
      this.dataSource.query('SELECT SLEEP(5)'),
    );
    await Promise.all(queries);
    return { status: 'ok' };
  }
}
