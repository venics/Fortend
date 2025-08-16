import FortniteAPI from 'fortnite-api-io';
import { ItemShopItem } from '../entities/ItemShopItem';
import dotenv from 'dotenv';

dotenv.config({ path: '.example.env' });

export class ItemShopService {
  private fortniteAPI: FortniteAPI;

  constructor() {
    if (!process.env.FORTNITE_API_IO_KEY) {
      throw new Error('FORTNITE_API_IO_KEY not found in .env file');
    }
    this.fortniteAPI = new FortniteAPI(process.env.FORTNITE_API_IO_KEY);
  }

  public async updateItemShop(): Promise<void> {
    try {
      const shop = await this.fortniteAPI.v2.shop();

      if (!shop || !shop.shop) {
        console.error('Failed to fetch item shop data.');
        return;
      }

      await ItemShopItem.clear();

      for (const item of shop.shop) {
        const newItem = new ItemShopItem();
        newItem.itemId = item.mainId;
        newItem.name = item.displayName;
        newItem.description = item.displayDescription;
        newItem.rarity = item.rarity.id;
        newItem.price = item.price.finalPrice;
        newItem.imageUrl = item.displayAssets[0].url;
        await newItem.save();
      }

      console.log('Item shop updated successfully.');
    } catch (error) {
      console.error('Error updating item shop:', error);
    }
  }
}
