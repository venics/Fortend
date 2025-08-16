import { User } from '../entities/User';

export class ProfileService {
  public async getProfile(userId: string): Promise<any> {
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    const profile = {
      _id: user.id,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      rvn: 1,
      wipeNumber: 1,
      accountId: user.id,
      profileId: 'common_core',
      version: '1.0',
      items: {
        'Currency:MtxPurchased': {
          templateId: 'Currency:MtxPurchased',
          attributes: {
            platform: 'Epic',
          },
          quantity: user.vbucks,
        },
      },
      stats: {
        attributes: {
          mtx_purchase_history: {},
        },
      },
    };

    return profile;
  }
}
