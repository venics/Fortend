import { Router } from 'express';
import { ItemShopItem } from '../entities/ItemShopItem';
import { ItemShopService } from '../services/ItemShopService';

const router = Router();

router.get('/fortnite/api/storefront/v2/update', async (req, res) => {
  const itemShopService = new ItemShopService();
  await itemShopService.updateItemShop();
  res.json({ status: 'ok' });
});

router.get('/fortnite/api/storefront/v2/catalog', async (req, res) => {
  const items = await ItemShopItem.find();

  const storefront = {
    refreshIntervalHrs: 24,
    dailyPurchaseHrs: 24,
    expiration: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    storefronts: [
      {
        name: 'BRDailyStorefront',
        catalogEntries: items.map((item) => ({
          offerId: `v2:/${item.itemId}`,
          devName: item.name,
          offerType: 'StaticPrice',
          prices: [
            {
              currencyType: 'MtxCurrency',
              currencySubType: '',
              regularPrice: item.price,
              finalPrice: item.price,
              saleExpiration: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
              basePrice: item.price,
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
          title: item.name,
          shortDescription: item.description,
          description: item.description,
          displayAssetPath: item.imageUrl,
          item: {
            templateId: item.itemId,
            attributes: {
              rarity: item.rarity,
            },
          },
        })),
      },
    ],
  };

  res.json(storefront);
});

export default router;
