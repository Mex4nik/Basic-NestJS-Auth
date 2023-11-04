import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { AddPhoneToUser1699128622370 } from 'migrations/1699128622370-AddPhoneToUser';
import { join } from 'path';
import { DataSource } from 'typeorm';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [AddPhoneToUser1699128622370],
});
