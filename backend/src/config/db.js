const mongoose = require('mongoose');

/**
 * Establishes a MongoDB connection using the provided connection string.
 * The function is resilient to transient failures and logs a helpful
 * message so the dev team can identify misconfigurations quickly.
 */
async function connectDB() {
  try {
    const mongoUri = process.env.MONGO_URI || '{{MONGO_CONNECTION_URL}}';

    if (!mongoUri || mongoUri.includes('{{MONGO_CONNECTION_URL}}')) {
      console.warn(
        '[db] MONGO_URI is missing. Please update env.sample with your connection string.'
      );
    }

    mongoose.set('strictQuery', true);
    await mongoose.connect(mongoUri, {
      dbName: process.env.PROJECT_NAME || 'pre_setup_hackathon',
    });

    console.log('[db] MongoDB connection established');
  } catch (error) {
    console.error('[db] MongoDB connection error:', error.message);
    process.exit(1);
  }
}

module.exports = connectDB;

