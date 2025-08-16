import { Router } from 'express';

const router = Router();

router.get('/fortnite/api/content/api/pages/fortnite-game', (req, res) => {
  res.json({
    "jcr:isCheckedOut": true,
    "_title": "fortnite-game",
    "jcr:baseVersion": "a7ca2373-2041-4be0-9c2c-df985385286a",
    "_activeDate": "2017-07-24T22:24:48.909Z",
    "lastModified": "2020-11-01T17:33:42.334Z",
    "_locale": "en-US",
    "emergencynotice": {
        "news": {
            "platform_messages": [],
            "_type": "Battle Royale News",
            "messages": [
                {
                    "hidden": false,
                    "_type": "CommonUI Simple Message Base",
                    "subgame": "br",
                    "body": "Welcome to Fortend! join our discord server! .gg/Flowfn",
                    "title": "Welcome to Fortend!",
                    "spotlight": false
                }
            ]
        },
        "jcr:isCheckedOut": true,
        "_title": "emergencynotice",
        "_noIndex": false,
        "alwaysShow": true,
        "jcr:baseVersion": "a7ca2373-2041-4be0-9c2c-df985385286a",
        "_activeDate": "2017-07-24T22:24:48.909Z",
        "lastModified": "2020-11-01T17:33:42.334Z",
        "_locale": "en-US"
    },
    "battleroyalenewsv2": {
        "news": {
            "motds": [
                {
                    "entryType": "Website",
                    "image": "https://i.imgur.com/228834v.png",
                    "tileImage": "https://i.imgur.com/228834v.png",
                    "videoMute": false,
                    "hidden": false,
                    "_type": "CommonUI Simple Message MOTD",
                    "title": "Welcome to Fortend!",
                    "body": "join our discord server! .gg/Flowfn",
                    "videoLoop": false,
                    "videoStreamingEnabled": false,
                    "sortingPriority": 20,
                    "id": "FortendNews",
                    "videoAutoplay": false,
                    "spotlight": false,
                    "websiteURL": "https://discord.gg/Flowfn"
                }
            ]
        },
    },
    "dynamicbackgrounds": {
        "backgrounds": {
            "backgrounds": [
                {
                    "stage": "defaultnotris",
                    "_type": "DynamicBackground",
                    "key": "lobby"
                }
            ]
        },
    },
    "playButton": {
        "jcr:isCheckedOut": true,
        "_title": "playButton",
        "buttontext": "Fortend",
        "_noIndex": false,
        "jcr:baseVersion": "a7ca2373-2041-4be0-9c2c-df985385286a",
        "_activeDate": "2017-07-24T22:24:48.909Z",
        "lastModified": "2020-11-01T17:33:42.334Z",
        "_locale": "en-US"
    }
  });
});

export default router;
