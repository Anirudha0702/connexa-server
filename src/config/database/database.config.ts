import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { QueueOptions } from 'bullmq';
import * as path from 'path';

/**
 * TypeORM Configuration
 */
export const getTypeOrmConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [path.join(__dirname, '../../**/*.entity{.ts,.js}')],
  logging: true,
  synchronize: true, // Recommended to control sync via env
  ssl: {
    rejectUnauthorized: true, // Ensure only trusted connections
    ca: process.env.POSTGES_CA, // Read CA certificate from file
  },
});

/**
 * Mongoose Configuration
 */
export const getMongooseConfig = (): MongooseModuleOptions => ({
  uri: process.env.MONGODB_URI,
});

/**
 * BullMQ Configuration
 */
export const getBullMqConfig = (): QueueOptions => ({
  connection: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10),
    username: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD,
    tls: {
      rejectUnauthorized: false,
    },
  },
});
