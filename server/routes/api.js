const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Profile = require('../models/Profile');

// In-memory fallback store when MongoDB is not connected
let memoryProfile = {
  name: '',
  age: '',
  height: '',
  weight: '',
  bodyfat: '',
  fitnessLevel: 'beginner',
  dietGoal: 'fat-loss'
};

const isDbConnected = () => mongoose.connection.readyState === 1;

/**
 * FORGE API Routes
 * 
 * The E and N in MERN: Express routes define the URL pathways (endpoints) 
 * that the frontend can fetch data from or post data to.
 * 
 * Since this is a prototype, we automatically query or update a single 
 * user profile document to keep it extremely simple.
 */

// 1. GET /api/profile - Fetch active user profile
router.get('/profile', async (req, res) => {
  try {
    if (isDbConnected()) {
      let profile = await Profile.findOne();
      if (!profile) {
        // If no profile exists yet in the database, return blank defaults
        return res.json({
          name: '',
          age: '',
          height: '',
          weight: '',
          bodyfat: '',
          fitnessLevel: 'beginner',
          dietGoal: 'fat-loss'
        });
      }
      return res.json(profile);
    }
    // Return in-memory fallback
    res.json(memoryProfile);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve profile: ' + err.message });
  }
});

// 2. POST /api/profile - Save/Update user profile
router.post('/profile', async (req, res) => {
  try {
    const { name, age, height, weight, bodyfat } = req.body;
    
    if (isDbConnected()) {
      let profile = await Profile.findOne();
      
      if (profile) {
        // Update existing document
        profile.name = name !== undefined ? name : profile.name;
        profile.age = age !== undefined ? age : profile.age;
        profile.height = height !== undefined ? height : profile.height;
        profile.weight = weight !== undefined ? weight : profile.weight;
        profile.bodyfat = bodyfat !== undefined ? bodyfat : profile.bodyfat;
        await profile.save();
      } else {
        // Create new document
        profile = new Profile({
          name: name || 'Anonymous',
          age: age || 25,
          height: height || 175,
          weight: weight || 70,
          bodyfat: bodyfat || 15,
          fitnessLevel: 'beginner',
          dietGoal: 'fat-loss'
        });
        await profile.save();
      }
      return res.json(profile);
    }

    // In-memory fallback
    memoryProfile = {
      ...memoryProfile,
      name: name !== undefined ? name : memoryProfile.name,
      age: age !== undefined ? age : memoryProfile.age,
      height: height !== undefined ? height : memoryProfile.height,
      weight: weight !== undefined ? weight : memoryProfile.weight,
      bodyfat: bodyfat !== undefined ? bodyfat : memoryProfile.bodyfat
    };
    res.json(memoryProfile);
  } catch (err) {
    res.status(400).json({ error: 'Failed to save profile: ' + err.message });
  }
});

// 3. GET /api/fitness - Fetch active fitness level classification
router.get('/fitness', async (req, res) => {
  try {
    if (isDbConnected()) {
      const profile = await Profile.findOne();
      return res.json({ level: profile ? profile.fitnessLevel : 'beginner' });
    }
    res.json({ level: memoryProfile.fitnessLevel || 'beginner' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. POST /api/fitness - Update fitness level classification
router.post('/fitness', async (req, res) => {
  try {
    const { level } = req.body;
    if (isDbConnected()) {
      let profile = await Profile.findOne();
      
      if (!profile) {
        // Create a skeleton profile if none exists
        profile = new Profile({
          name: 'Anonymous',
          age: 25,
          height: 175,
          weight: 70,
          bodyfat: 15,
          fitnessLevel: level
        });
      } else {
        profile.fitnessLevel = level;
      }
      
      await profile.save();
      return res.json({ level: profile.fitnessLevel });
    }

    memoryProfile.fitnessLevel = level;
    res.json({ level: memoryProfile.fitnessLevel });
  } catch (err) {
    res.status(400).json({ error: 'Failed to save fitness level: ' + err.message });
  }
});

// 5. GET /api/diet - Fetch active diet goal
router.get('/diet', async (req, res) => {
  try {
    if (isDbConnected()) {
      const profile = await Profile.findOne();
      return res.json({ goal: profile ? profile.dietGoal : 'fat-loss' });
    }
    res.json({ goal: memoryProfile.dietGoal || 'fat-loss' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. POST /api/diet - Update diet goal
router.post('/diet', async (req, res) => {
  try {
    const { goal } = req.body;
    if (isDbConnected()) {
      let profile = await Profile.findOne();
      
      if (!profile) {
        // Create a skeleton profile if none exists
        profile = new Profile({
          name: 'Anonymous',
          age: 25,
          height: 175,
          weight: 70,
          bodyfat: 15,
          dietGoal: goal
        });
      } else {
        profile.dietGoal = goal;
      }
      
      await profile.save();
      return res.json({ goal: profile.dietGoal });
    }

    memoryProfile.dietGoal = goal;
    res.json({ goal: memoryProfile.dietGoal });
  } catch (err) {
    res.status(400).json({ error: 'Failed to save diet goal: ' + err.message });
  }
});

module.exports = router;
