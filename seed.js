import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import User from './models/User.js'; // Adjust path as needed
import Task from './models/Task.js';        // Adjust path as needed
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/your-db-name';

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Task.deleteMany({});
    console.log('🧹 Cleared existing data');

    const users = [];

    for (let i = 1; i <= 10; i++) {
      const hashedPassword = await bcrypt.hash(`password${i}`, 10);
      const user = new User({
        name: `User ${i}`,
        email: `user${i}@example.com`,
        password: hashedPassword,
      });
      await user.save();
      users.push(user);
    }

    console.log('👥 Users created');

    for (const user of users) {
      for (let j = 1; j <= 10; j++) {
        const task = new Task({
          title: `Task ${j} for ${user.name}`,
          description: `This is task number ${j} for ${user.name}`,
          userId: user._id,
          important: Math.random() > 0.7,
          completed: Math.random() > 0.5,
        });
        await task.save();
      }
    }

    console.log('📝 Tasks created for all users');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

seed();
