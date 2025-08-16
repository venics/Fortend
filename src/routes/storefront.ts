import { Router } from 'express';
import fs from 'fs/promises';
import path from 'path';

const router = Router();

interface ShopItem {
  [key: string]: string | number;
}

router.get('/fortnite/api/storefront/v2/catalog', async (req, res) => {
  try {
    const shopPath = path.join(process.cwd(), 'Config', 'item-shop.json');
    const shopData: ShopItem = JSON.parse(await fs.readFile(shopPath, 'utf-8'));

    const catalogEntries = [];
    const keys = Object.keys(shopData);

    for (let i = 0; i < keys.length; i += 2) {
      const idKey = keys[i];
      const priceKey = keys[i + 1];

      const itemId = shopData[idKey] as string;
      const price = shopData[priceKey] as number;

      catalogEntries.push({
        offerId: `v2:/${itemId}`,
        devName: `[VIRTUAL] ${itemId}`,
        offerType: 'StaticPrice',
        prices: [
          {
            currencyType: 'MtxCurrency',
            currencySubType: '',
            regularPrice: price,
            finalPrice: price,
            saleExpiration: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            basePrice: price,
          },
        ],
        categories: [],
        dailyLimit: -1,
        weeklyLimit: -1,
        monthlyLimit: -1,
        refundable: true,
        appStoreId: [],
        requirements: [],
        metaInfo: [],
        catalogGroup: '',
        catalogGroupPriority: 0,
        sortPriority: 0,
        title: itemId.split('_').pop(),
        shortDescription: 'A cool item!',
        description: 'A very cool item!',
        displayAssetPath: '',
        item: {
          templateId: itemId,
          attributes: {},
        },
      });
    }

    const storefront = {
      refreshIntervalHrs: 24,
      dailyPurchaseHrs: 24,
      expiration: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      storefronts: [
        {
          name: 'BRDailyStorefront',
          catalogEntries,
        },
      ],
    };

    res.json(storefront);
  } catch (error) {
    console.error('Error reading or parsing item shop config:', error);
    res.status(500).json({ error: 'Failed to load storefront data.' });
  }
});

export default router;
