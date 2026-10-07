import React, { useState, useEffect } from 'react';
import { apiService } from './api';

// Modules
import Profile from './modules/Profile';
import FitnessLevel from './modules/FitnessLevel';
import Workouts from './modules/Workouts';
import Nutrition from './modules/Nutrition';
import Supplements from './modules/Supplements';
import DietGoal from './modules/DietGoal';
import AdultZone from './modules/AdultZone';

export default function App() {
  // Navigation & View Routing State
  const [activeModule, setActiveModule] = useState('dashboard'); // 'dashboard' or 'plate1' to 'plate7'

  // Application States
  const [profile, setProfile] = useState({ name: '', age: '', height: '', weight: '', bodyfat: '' });
  const [fitnessLevel, setFitnessLevel] = useState('beginner');
  const [dietGoal, setDietGoal] = useState('fat-loss');
  const [adultVerified, setAdultVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load States from API Service on Mount
  useEffect(() => {
    async function loadData() {
      try {
        const prof = await apiService.getProfile();
        const fitLvl = await apiService.getFitnessLevel();
        const goal = await apiService.getDietGoal();
        const verified = await apiService.getAdultVerification();

        setProfile(prof);
        setFitnessLevel(fitLvl);
        setDietGoal(goal);
        setAdultVerified(verified);
      } catch (err) {
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Handle Updates
  const handleProfileSave = async (updatedProfile) => {
    setProfile(updatedProfile);
    await apiService.saveProfile(updatedProfile);
    // Auto verify age if profile age is entered and >= 18
    if (updatedProfile.age && parseInt(updatedProfile.age) >= 18) {
      setAdultVerified(true);
      await apiService.saveAdultVerification(true);
    } else if (updatedProfile.age && parseInt(updatedProfile.age) < 18) {
      setAdultVerified(false);
      await apiService.saveAdultVerification(false);
    }
  };

  const handleFitnessSelect = async (level) => {
    setFitnessLevel(level);
    await apiService.saveFitnessLevel(level);
  };

  const handleDietSelect = async (goal) => {
    setDietGoal(goal);
    await apiService.saveDietGoal(goal);
  };

  const handleAdultVerify = async (isVerified) => {
    setAdultVerified(isVerified);
    await apiService.saveAdultVerification(isVerified);
  };

  const handleSignOut = async () => {
    const blankProfile = { name: '', age: '', height: '', weight: '', bodyfat: '' };
    setProfile(blankProfile);
    setAdultVerified(false);
    
    await apiService.saveProfile(blankProfile);
    await apiService.saveAdultVerification(false);
    localStorage.removeItem('forge_progress_photo');
    localStorage.removeItem('forge_meal_times');
    localStorage.removeItem('forge_selected_supplements');
    localStorage.removeItem('forge_selected_split');
    localStorage.removeItem('forge_completed_sets');
    localStorage.removeItem('forge_morning_activity');
    
    setActiveModule('dashboard');
  };

  // Barbell plates configuration
  const plates = [
    { id: 'plate1', tag: 'Profile', num: '01', height: '46px' },
    { id: 'plate2', tag: 'Level', num: '02', height: '58px' },
    { id: 'plate3', tag: 'Train', num: '03', height: '74px' },
    { id: 'plate6', tag: 'Strategy', num: '04', height: '74px' },
    { id: 'plate4', tag: 'Fuel', num: '05', height: '66px' },
    { id: 'plate5', tag: 'Stacks', num: '06', height: '58px' },
    { id: 'plate7', tag: 'Adult', num: '07', height: '46px', isRestricted: true }
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: 'var(--graphite)', color: 'var(--vital)', fontFamily: 'Space Mono' }}>
        CALIBRATING FORGE PLATFORM...
      </div>
    );
  }

  return (
    <div>
      {/* NAVIGATION BAR */}
      <nav>
        <div className="wrap">
          <div className="logo" onClick={() => setActiveModule('dashboard')}>
            FOR<span>GE</span>
          </div>
          <div className="nav-links">
            <button onClick={() => setActiveModule('dashboard')}>Dashboard</button>
            <button onClick={() => setActiveModule('plate1')}>Profile</button>
            <button onClick={() => setActiveModule('plate3')}>Workouts</button>
            <button onClick={() => setActiveModule('plate4')}>Nutrition</button>
            <button onClick={() => setActiveModule('plate7')}>Adult Zone</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button className="nav-cta" onClick={() => setActiveModule('plate1')}>
              {profile.name ? profile.name : 'LOG IN'}
            </button>
            {profile.name && (
              <button 
                type="button"
                className="mono" 
                onClick={handleSignOut} 
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: 'var(--vital)', 
                  cursor: 'pointer', 
                  fontSize: '12px', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em' 
                }}
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* DASHBOARD VIEW */}
      {activeModule === 'dashboard' && (
        <>
          <header className="hero">
            <div className="wrap">
              <div className="hero-brand-row">
                <div className="hero-logo-animate">
                  <span className="letter l1">F</span>
                  <span className="letter l2">O</span>
                  <span className="letter l3">R</span>
                  <span className="letter l4 orange">G</span>
                  <span className="letter l5 orange">E</span>
                </div>
                <div className="hero-quote-animate">
                  // Strength is forged in the fires of discipline.
                </div>
              </div>
              <h1 className="headline hero-animate-headline">
                <span className="hero-title-line line-1">Every rep.</span>
                <span className="hero-title-line line-2">Every gram.</span>
                <span className="hero-title-line line-3 accent">One log.</span>
              </h1>
              <p className="sub hero-animate-sub">
                FORGE tracks who you are, what you lift, and what you eat — then routes it into the right plan, whether you're walking into a gym for the first time or prepping for a show.
              </p>
              <div className="hero-ctas hero-animate-ctas">
                <button className="btn-primary" onClick={() => setActiveModule('plate1')}>
                  {profile.name ? 'Edit Profile' : 'Create Profile'}
                </button>
                <a href="#modules" className="btn-ghost">See the Modules</a>
              </div>

              {/* INTERACTIVE BARBELL SIGNATURE */}
              <div className="bar-rig">
                <div className="bar-rig-inner">
                  <div className="bar-cap"></div>
                  <div className="bar-rod"></div>
                  <div className="plate-stack" id="plateStack">
                    {plates.map((p) => {
                      const isActive = activeModule === p.id;
                      return (
                        <div
                          key={p.id}
                          className={`plate in-view ${isActive ? 'active' : ''}`}
                          style={{ '--h': p.height }}
                          onClick={() => setActiveModule(p.id)}
                        >
                          <span className="tag">{p.tag}</span>
                          <span className="num">{p.num}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="bar-rod"></div>
                  <div className="bar-cap"></div>
                </div>
              </div>
            </div>
          </header>

          {/* MODULE GRID SECTION */}
          <section className="modules" id="modules">
            <div className="wrap">
              <div className="section-head">
                <h2>The seven plates</h2>
                <p>Each plate is a functional React module that reads and updates the centralized session state.</p>
              </div>

              <div className="grid">
                {/* Plate 1: Profile */}
                <div className="card" onClick={() => setActiveModule('plate1')}>
                  <span className="idx">01 / Entry</span>
                  <h3>Login &amp; Profile</h3>
                  <p>
                    {profile.name 
                      ? `Active user: ${profile.name}, ${profile.age} years old.`
                      : 'Enter name, age, height, weight, body fat % — the baseline specs.'}
                  </p>
                  <div className="pill-row">
                    <span className={`pill ${profile.name ? 'highlighted' : ''}`}>
                      {profile.name ? profile.name : 'Name'}
                    </span>
                    <span className={`pill ${profile.age ? 'highlighted' : ''}`}>
                      {profile.age ? `${profile.age} yrs` : 'Age'}
                    </span>
                    <span className={`pill ${profile.height ? 'highlighted' : ''}`}>
                      {profile.height ? `${profile.height} cm` : 'Height'}
                    </span>
                    <span className={`pill ${profile.weight ? 'highlighted' : ''}`}>
                      {profile.weight ? `${profile.weight} kg` : 'Weight'}
                    </span>
                    <span className={`pill ${profile.bodyfat ? 'highlighted' : ''}`}>
                      {profile.bodyfat ? `${profile.bodyfat}% BF` : 'Body Fat'}
                    </span>
                  </div>
                </div>

                {/* Plate 2: Fitness Level */}
                <div className="card" onClick={() => setActiveModule('plate2')}>
                  <span className="idx">02 / Classify</span>
                  <h3>Fitness Level</h3>
                  <p>Where you're starting from decides what program the app serves you.</p>
                  <div className="pill-row">
                    <span className={`pill ${fitnessLevel === 'beginner' ? 'highlighted' : ''}`}>Beginner</span>
                    <span className={`pill ${fitnessLevel === 'active' ? 'highlighted' : ''}`}>Active</span>
                    <span className={`pill ${fitnessLevel === 'bodybuilding' ? 'highlighted' : ''}`}>Bodybuilding</span>
                    <span className={`pill ${fitnessLevel === 'fit' ? 'highlighted' : ''}`}>Fit</span>
                  </div>
                </div>

                {/* Plate 3: Workouts */}
                <div className="card" onClick={() => setActiveModule('plate3')}>
                  <span className="idx">03 / Train</span>
                  <h3>Workouts</h3>
                  <p>Structured programs that scale in load and complexity as you progress.</p>
                  <div className="pill-row">
                    <span className={`pill ${fitnessLevel === 'beginner' ? 'highlighted' : ''}`}>Beginner</span>
                    <span className={`pill ${fitnessLevel === 'active' ? 'highlighted' : ''}`}>Medium</span>
                    <span className={`pill ${fitnessLevel === 'bodybuilding' || fitnessLevel === 'fit' ? 'highlighted' : ''}`}>Advance</span>
                  </div>
                </div>

                {/* Plate 4: Diet Goals (Strategy) */}
                <div className="card" onClick={() => setActiveModule('plate6')}>
                  <span className="idx">04 / Goal</span>
                  <h3>Diet Strategy</h3>
                  <p>One clear target drives the plan — no mixed signals.</p>
                  <div className="pill-row">
                    <span className={`pill ${dietGoal === 'weight-loss' ? 'highlighted' : ''}`}>Weight Loss</span>
                    <span className={`pill ${dietGoal === 'fat-loss' ? 'highlighted' : ''}`}>Fat Loss</span>
                    <span className={`pill ${dietGoal === 'body-recomposition' ? 'highlighted' : ''}`}>Recomposition</span>
                    <span className={`pill ${dietGoal === 'weight-gain' ? 'highlighted' : ''}`}>Weight Gain</span>
                    <span className={`pill ${dietGoal === 'muscle-gain' ? 'highlighted' : ''}`}>Muscle Gain</span>
                  </div>
                </div>

                {/* Plate 5: Nutrition (Fuel) */}
                <div className="card" onClick={() => setActiveModule('plate4')}>
                  <span className="idx">05 / Fuel</span>
                  <h3>Nutrition</h3>
                  <p>What's obtainable from food alone — custom diet builder &amp; steps tracker.</p>
                  <div className="pill-row">
                    <span className="pill highlighted">Diet Builder</span>
                    <span className="pill highlighted">Macros</span>
                    <span className="pill highlighted">Steps Tracker</span>
                  </div>
                </div>

                {/* Plate 6: Supplements (Stacks) */}
                <div className="card" onClick={() => setActiveModule('plate5')}>
                  <span className="idx">06 / Fill Gaps</span>
                  <h3>Supplements</h3>
                  <p>Practical additions to food that are hard to get in standard quantities.</p>
                  <div className="pill-row">
                    <span className="pill highlighted">Protein</span>
                    <span className="pill highlighted">Creatine</span>
                    <span className="pill highlighted">Micronutrients</span>
                  </div>
                </div>

                {/* Plate 7: Restricted Zone */}
                <div className="card gated" onClick={() => setActiveModule('plate7')}>
                  <span className="idx">07 / Restricted</span>
                  <h3>Adult Zone</h3>
                  <p>Age-verified educational content only — risks, legality, and harm information.</p>
                  <div className="pill-row">
                    <span className={`pill ${adultVerified ? 'highlighted' : ''}`}>18+ Only</span>
                    <span className={`pill ${adultVerified ? 'highlighted' : ''}`}>ID Gate</span>
                    <span className="pill">Educational</span>
                  </div>
                  <div className="lock-note">
                    {adultVerified ? '// age verified - click to read references' : '// placeholder — age verification required'}
                  </div>
                </div>
              </div>
            </div>
          </section>


        </>
      )}

      {/* MODULE DETAIL VIEW CONTAINER */}
      {activeModule !== 'dashboard' && (
        <section className="modules">
          <div className="wrap">
            <button className="btn-back" onClick={() => setActiveModule('dashboard')}>
              &larr; Back to Dashboard
            </button>

            {activeModule === 'plate1' && (
              <Profile profile={profile} onSave={handleProfileSave} fitnessLevel={fitnessLevel} />
            )}
            {activeModule === 'plate2' && (
              <FitnessLevel selectedLevel={fitnessLevel} onSelect={handleFitnessSelect} />
            )}
            {activeModule === 'plate3' && (
              <Workouts fitnessLevel={fitnessLevel} />
            )}
            {activeModule === 'plate4' && (
              <Nutrition profile={profile} dietGoal={dietGoal} />
            )}
            {activeModule === 'plate5' && (
              <Supplements profile={profile} fitnessLevel={fitnessLevel} />
            )}
            {activeModule === 'plate6' && (
              <DietGoal selectedGoal={dietGoal} onSelect={handleDietSelect} />
            )}
            {activeModule === 'plate7' && (
              <AdultZone isVerified={adultVerified} onVerify={handleAdultVerify} />
            )}
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer>
        <div className="wrap">
          <div className="footer-top">
            <div className="logo" onClick={() => setActiveModule('dashboard')}>
              FOR<span>GE</span>
            </div>
            <p className="footer-note">
              Login, Workouts, Nutrition, Supplements, Diet, and the Adult Zone are each their own React component, running dynamically off central state and stored via localStorage.
            </p>
          </div>
          <div className="footer-bottom">
            <span className="mono">// client app operational — mock data model configured</span>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <a href="https://forge-vht8.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--vital)', textDecoration: 'none', fontWeight: 'bold' }} className="mono">🚀 Live App</a>
              <a href="https://github.com/Arun-1107/FORGE" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--steel)', textDecoration: 'none' }} className="mono">★ GitHub</a>
            </div>
            <span className="mono">FORGE © 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
