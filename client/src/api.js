/**
 * FORGE API Service
 * 
 * In a full MERN stack application, the frontend (React) communicates with 
 * the backend (Express/Node.js) via HTTP requests (API calls).
 * 
 * To make this prototype fully functional immediately without requiring a running database,
 * this service uses localStorage to simulate database persistence.
 * 
 * WHEN YOU ARE READY TO UPGRADE TO A REAL BACKEND:
 * 1. Start your Node.js/Express server (located in the /server folder).
 * 2. Change the API_BASE_URL below to point to your server (e.g., 'http://localhost:5000/api').
 * 3. Uncomment the fetch() code blocks inside each function and comment out the localStorage code.
 */

// If you run the Express backend, point this to your backend server URL
const API_BASE_URL = 'http://localhost:5000/api';

// Set this to true when you want to connect the frontend to the backend server!
const USE_REAL_BACKEND = true;

export const apiService = {
  /**
   * 1. Profile Data (Plate 01)
   */
  async getProfile() {
    if (USE_REAL_BACKEND) {
      try {
        const response = await fetch(`${API_BASE_URL}/profile`);
        if (!response.ok) throw new Error('Failed to fetch profile');
        return await response.json();
      } catch (err) {
        console.error('Backend error, falling back to localStorage:', err);
      }
    }

    // Mock Backend / LocalStorage Fallback
    const profile = localStorage.getItem('forge_profile');
    return profile ? JSON.parse(profile) : {
      name: '',
      age: '',
      height: '',
      weight: '',
      bodyfat: ''
    };
  },

  async saveProfile(profileData) {
    if (USE_REAL_BACKEND) {
      try {
        const response = await fetch(`${API_BASE_URL}/profile`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profileData)
        });
        if (!response.ok) throw new Error('Failed to save profile');
        return await response.json();
      } catch (err) {
        console.error('Backend error, falling back to localStorage:', err);
      }
    }

    // Mock Backend / LocalStorage Fallback
    localStorage.setItem('forge_profile', JSON.stringify(profileData));
    return profileData;
  },

  /**
   * 2. Fitness Level (Plate 02)
   */
  async getFitnessLevel() {
    if (USE_REAL_BACKEND) {
      try {
        const response = await fetch(`${API_BASE_URL}/fitness`);
        if (!response.ok) throw new Error('Failed to fetch fitness level');
        const data = await response.json();
        return data.level || 'beginner';
      } catch (err) {
        console.error(err);
      }
    }
    const level = localStorage.getItem('forge_fitness_level');
    return level || 'beginner'; // Default
  },

  async saveFitnessLevel(level) {
    if (USE_REAL_BACKEND) {
      try {
        const response = await fetch(`${API_BASE_URL}/fitness`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ level })
        });
        if (!response.ok) throw new Error('Failed to save fitness level');
        const data = await response.json();
        return data.level || level;
      } catch (err) {
        console.error(err);
      }
    }
    localStorage.setItem('forge_fitness_level', level);
    return level;
  },

  /**
   * 3. Diet Goal (Plate 06)
   */
  async getDietGoal() {
    if (USE_REAL_BACKEND) {
      try {
        const response = await fetch(`${API_BASE_URL}/diet`);
        if (!response.ok) throw new Error('Failed to fetch diet goal');
        const data = await response.json();
        return data.goal || 'fat-loss';
      } catch (err) {
        console.error(err);
      }
    }
    const goal = localStorage.getItem('forge_diet_goal');
    return goal || 'fat-loss'; // Default
  },

  async saveDietGoal(goal) {
    if (USE_REAL_BACKEND) {
      try {
        const response = await fetch(`${API_BASE_URL}/diet`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ goal })
        });
        if (!response.ok) throw new Error('Failed to save diet goal');
        const data = await response.json();
        return data.goal || goal;
      } catch (err) {
        console.error(err);
      }
    }
    localStorage.setItem('forge_diet_goal', goal);
    return goal;
  },

  /**
   * 4. Age verification check for Adult Zone (Plate 07)
   */
  async getAdultVerification() {
    const verified = localStorage.getItem('forge_adult_verified');
    return verified === 'true';
  },

  async saveAdultVerification(isVerified) {
    localStorage.setItem('forge_adult_verified', isVerified ? 'true' : 'false');
    return isVerified;
  }
};
