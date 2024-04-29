import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private client: Client;

  async onModuleInit() {
    this.client = new Client({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    await this.client.connect();
  }

  getClient() {
    return this.client;
  }

  async runScripts() {
    const insertCarts = `
      INSERT INTO carts (id, user_id, created_at, updated_at, status) VALUES 
      ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', CURRENT_DATE, CURRENT_DATE, 'OPEN'),
      ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', CURRENT_DATE, CURRENT_DATE, 'ORDERED');
    `;

    const insertCartItems = `
      INSERT INTO cart_items (cart_id, product_id, count) VALUES 
      ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'd1eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 2),
      ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 3);
    `;

    await this.client.query(insertCarts);
    await this.client.query(insertCartItems);
  }
}