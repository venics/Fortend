import { Router } from 'express';
import { ProfileService } from '../services/ProfileService';

const router = Router();
const profileService = new ProfileService();

router.post('/fortnite/api/game/v2/profile/:accountId/client/QueryProfile', async (req, res) => {
  const { accountId } = req.params;
  const { profileId } = req.query;

  if (profileId === 'common_core') {
    try {
      const profile = await profileService.getProfile(accountId);
      res.json({
        profileRevision: profile.rvn,
        profileId: profile.profileId,
        profileChangesBaseRevision: profile.rvn,
        profileChanges: [
          {
            changeType: 'fullProfileUpdate',
            profile: profile,
          },
        ],
        serverTime: new Date().toISOString(),
        profileCommandRevision: profile.rvn,
        responseVersion: 1,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  } else {
    res.status(400).json({ error: 'Invalid profileId' });
  }
});

export default router;
