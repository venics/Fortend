import User from '../db/User';
import Profiles from '../db/Profiles';

export class ProfileService {
  public async getProfile(accountId: string): Promise<any> {
    const user = await User.findOne({ accountId });
    const profileData = await Profiles.findOne({ accountId });

    if (!user || !profileData) {
      throw new Error('User or profile not found');
    }

    const profile = profileData.profile.common_core;
    profile.accountId = accountId;
    profile.created = new Date().toISOString();
    profile.updated = new Date().toISOString();
    profile.rvn = 1;
    profile.wipeNumber = 1;
    profile.version = '1.0';

    if (profile.items && profile.items['Currency:MtxPurchased']) {
        profile.items['Currency:MtxPurchased'].quantity = user.vbucks;
    } else {
        profile.items['Currency:MtxPurchased'] = {
            templateId: 'Currency:MtxPurchased',
            attributes: { platform: 'Epic' },
            quantity: user.vbucks,
        };
    }


    return profile;
  }
}
