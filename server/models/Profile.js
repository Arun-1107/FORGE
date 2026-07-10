const mongoose = require('mongoose');

/**
 * Profile Schema
 * 
 * The M in MERN: MongoDB is a document database. A Mongoose schema
 * defines the shape of documents inside a collection.
 * 
 * In this single collection, we will store the user's active settings,
 * including profile metrics, fitness level, and diet goal.
 */
const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    default: 'Anonymous'
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [1, 'Age must be at least 1']
  },
  height: {
    type: Number,
    required: [true, 'Height is required'],
    min: [50, 'Height must be at least 50cm']
  },
  weight: {
    type: Number,
    required: [true, 'Weight is required'],
    min: [20, 'Weight must be at least 20kg']
  },
  bodyfat: {
    type: Number,
    required: [true, 'Body fat percentage is required'],
    min: [1, 'Body fat must be at least 1%'],
    max: [60, 'Body fat must be less than 60%']
  },
  fitnessLevel: {
    type: String,
    enum: ['beginner', 'active', 'bodybuilding', 'fit'],
    default: 'beginner'
  },
  dietGoal: {
    type: String,
    enum: ['weight-loss', 'fat-loss', 'body-recomposition', 'weight-gain', 'muscle-gain'],
    default: 'fat-loss'
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt date before saving
ProfileSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Profile', ProfileSchema);
