import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Injectable()
export class TestDataService {
  constructor(private databaseService: DatabaseService) {}

  async insertTestData() {
    await this.databaseService.runScripts();
  }
}
