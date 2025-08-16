import cron from 'node-cron';
import { ItemShopService } from './services/ItemShopService';

export const scheduleDailyItemShopUpdate = () => {
  const itemShopService = new ItemShopService();

  // Schedule to run every day at midnight
  cron.schedule('0 0 * * *', () => {
    console.log('Running daily item shop update...');
    itemShopService.updateItemShop();
  });
};
