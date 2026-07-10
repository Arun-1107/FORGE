const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

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
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve profile: ' + err.message });
  }
});

// 2. POST /api/profile - Save/Update user profile
router.post('/profile', async (req, res) => {
  try {
    const { name, age, height, weight, bodyfat } = req.body;
    
    let profile = await Profile.findOne();
    
    if (profile) {
      // Update existing document
      profile.name = name || profile.name;
      profile.age = age || profile.age;
      profile.height = height || profile.height;
      profile.weight = weight || profile.weight;
      profile.bodyfat = bodyfat || profile.bodyfat;
      await profile.save();
    } else {
      // Create new document
      profile = new Profile({
        name,
        age,
        height,
        weight,
        bodyfat,
        fitnessLevel: 'beginner',
        dietGoal: 'fat-loss'
      });
      await profile.save();
    }
    
    res.json(profile);
  } catch (err) {
    res.status(400).json({ error: 'Failed to save profile: ' + err.message });
  }
});

// 3. GET /api/fitness - Fetch active fitness level classification
router.get('/fitness', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json({ level: profile ? profile.fitnessLevel : 'beginner' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. POST /api/fitness - Update fitness level classification
router.post('/fitness', async (req, res) => {
  try {
    const { level } = req.body;
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
    res.json({ level: profile.fitnessLevel });
  } catch (err) {
    res.status(400).json({ error: 'Failed to save fitness level: ' + err.message });
  }
});

// 5. GET /api/diet - Fetch active diet goal
router.get('/diet', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json({ goal: profile ? profile.dietGoal : 'fat-loss' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. POST /api/diet - Update diet goal
router.post('/diet', async (req, res) => {
  try {
    const { goal } = req.body;
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
    res.json({ goal: profile.dietGoal });
  } catch (err) {
    res.status(400).json({ error: 'Failed to save diet goal: ' + err.message });
  }
});

module.exports = router;
