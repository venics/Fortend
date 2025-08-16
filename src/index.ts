import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { ItemShopItem } from './entities/ItemShopItem';

dotenv.config({ path: '.example.env' });

const app = express();
const port = process.env.port || 3000;

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.databaseUrl,
  entities: [User, ItemShopItem],
  synchronize: true, // shouldn't be used in production
});

import { startDiscordBot } from './discord';

import { scheduleDailyItemShopUpdate } from './cron';

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    startDiscordBot();
    scheduleDailyItemShopUpdate();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

import storefrontRouter from './routes/storefront';

app.use(storefrontRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});
