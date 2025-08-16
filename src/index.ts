import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { startBot } from './BOT';
import storefrontRouter from './routes/storefront';
import profileRouter from './routes/profile';

dotenv.config({ path: '.example.env' });

const app = express();
const port = process.env.port || 3000;
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error('MONGODB_URI not found in .env file. Server will not start.');
  process.exit(1);
}

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Successfully connected to MongoDB.');

    startBot();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

app.use(express.json());
app.use(storefrontRouter);
app.use(profileRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});
