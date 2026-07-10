import React, { useState } from 'react';

const SPLITS = {
  ppl: {
    name: 'Push / Pull / Legs (PPL)',
    focus: 'Functional Hypertrophy & Symmetry',
    schedule: '6 Days / Week (Rotational)',
    desc: 'High-frequency hypertrophic protocol dividing movements by muscle function (push, pull, or leg actions) to maximize structural tension and recovery.',
    sessions: [
      {
        id: 'ppl_push',
        name: 'Push Session (Chest, Shoulders & Triceps)',
        exercises: [
          { name: 'Incline Dumbbell Press', sets: 4, reps: '8-10', tempo: '3-1-1-0' },
          { name: 'Flat Barbell Bench Press', sets: 4, reps: '6-8', tempo: '2-1-1-0' },
          { name: 'Standing Overhead Military Press', sets: 3, reps: '8-10', tempo: '2-0-1-0' },
          { name: 'Cable Lateral Raise', sets: 4, reps: '12-15', tempo: '2-0-1-1' },
          { name: 'Overhead Dumbbell Tricep Extension', sets: 3, reps: '12', tempo: '3-0-1-0' },
          { name: 'Triceps Rope Pushdowns', sets: 3, reps: '12-15', tempo: '2-0-1-1' }
        ]
      },
      {
        id: 'ppl_pull',
        name: 'Pull Session (Back, Rear Delts & Biceps)',
        exercises: [
          { name: 'Conventional Deadlift', sets: 3, reps: '5', tempo: '1-0-1-0' },
          { name: 'Weighted Pull-Ups', sets: 4, reps: '6-8', tempo: '2-1-1-0' },
          { name: 'Seated Cable Row (Wide Grip)', sets: 3, reps: '10-12', tempo: '2-0-1-1' },
          { name: 'Chest Supported Dumbbell Row', sets: 3, reps: '10-12', tempo: '2-0-1-0' },
          { name: 'Face Pulls (Rear Delts)', sets: 4, reps: '15', tempo: '2-1-1-2' },
          { name: 'Dumbbell Hammer Curls', sets: 3, reps: '10-12', tempo: '3-0-1-0' }
        ]
      },
      {
        id: 'ppl_legs',
        name: 'Legs Session (Quads, Hamstrings & Calves)',
        exercises: [
          { name: 'High-Bar Back Squat', sets: 4, reps: '6-8', tempo: '3-2-1-0' },
          { name: 'Barbell Romanian Deadlift', sets: 4, reps: '8-10', tempo: '3-1-1-0' },
          { name: 'Bulgarian Split Squat', sets: 3, reps: '10 (per leg)', tempo: '2-0-1-0' },
          { name: 'Leg Press (Quad Focus)', sets: 3, reps: '12-15', tempo: '2-0-1-0' },
          { name: 'Standing Calf Raise', sets: 4, reps: '15', tempo: '2-1-1-2' },
          { name: 'Hanging Leg Raise (Core)', sets: 3, reps: '15', tempo: 'Static' }
        ]
      }
    ]
  },
  double: {
    name: 'Double Muscle Group Split',
    focus: 'Targeted Volume & Strength Progression',
    schedule: '4-5 Days / Week',
    desc: 'Binds complementary or opposing muscle groups in single workouts, allowing maximum weight lift targets and long recovery windows.',
    sessions: [
      {
        id: 'double_chest_triceps',
        name: 'Session A: Chest & Triceps',
        exercises: [
          { name: 'Incline Bench Press', sets: 4, reps: '8-10', tempo: '3-1-1-0' },
          { name: 'Dumbbell Flyes', sets: 3, reps: '12', tempo: '2-1-1-0' },
          { name: 'Weighted Dips (Chest Focus)', sets: 3, reps: '8-10', tempo: '2-1-1-0' },
          { name: 'Skull Crushers (EZ-Bar)', sets: 3, reps: '10', tempo: '3-0-1-0' },
          { name: 'Triceps Overhead Extension', sets: 3, reps: '12', tempo: '2-0-1-0' }
        ]
      },
      {
        id: 'double_back_biceps',
        name: 'Session B: Back & Biceps',
        exercises: [
          { name: 'Barbell Pendlay Rows', sets: 4, reps: '6-8', tempo: '2-0-1-0' },
          { name: 'Lat Pulldowns (Medium Grip)', sets: 4, reps: '10-12', tempo: '2-0-1-1' },
          { name: 'One-Arm Dumbbell Row', sets: 3, reps: '10', tempo: '2-0-1-0' },
          { name: 'Standing Barbell Bicep Curl', sets: 4, reps: '10', tempo: '3-0-1-0' },
          { name: 'Preacher Curl (Dumbbell)', sets: 3, reps: '12', tempo: '2-0-1-1' }
        ]
      },
      {
        id: 'double_legs_shoulders',
        name: 'Session C: Legs & Shoulders',
        exercises: [
          { name: 'Barbell Back Squat', sets: 4, reps: '8-10', tempo: '3-1-1-0' },
          { name: 'Lying Leg Curl (Hamstring)', sets: 3, reps: '12', tempo: '2-0-1-1' },
          { name: 'Seated Dumbbell Shoulder Press', sets: 4, reps: '8', tempo: '2-0-1-0' },
          { name: 'Dumbbell Lateral Raise', sets: 4, reps: '12-15', tempo: '2-0-1-1' },
          { name: 'Barbell Shrugs (Traps)', sets: 3, reps: '12', tempo: '2-0-1-1' }
        ]
      }
    ]
  },
  single: {
    name: 'Single Muscle Group Split',
    focus: 'Symmetry, Thickness & Muscle Volume',
    schedule: '5 Days / Week + Abs',
    desc: 'Adapted directly from your 90-day presentation plan. Isolates one major muscle group per day (Chest, Back, Shoulders, Arms, Legs, Abs) with specific aesthetic goals.',
    sessions: [
      {
        id: 'single_chest',
        name: 'Day 1: Chest',
        goal: 'Build upper chest shape. Intensity: Last set push hard (not every set).',
        exercises: [
          { name: 'Incline Dumbbell Press (Heavy)', sets: 4, reps: '8-10', tempo: '3-1-1-0' },
          { name: 'Incline Barbell Press', sets: 3, reps: '6-8', tempo: '2-1-1-0' },
          { name: 'Low-to-High Cable Fly', sets: 3, reps: '12-15', tempo: '2-0-1-2' },
          { name: 'Flat Dumbbell Press', sets: 3, reps: '8-10', tempo: '2-0-1-0' },
          { name: 'Dips (Chest focus)', sets: 3, reps: 'Failure', tempo: '2-1-1-0' }
        ]
      },
      {
        id: 'single_back',
        name: 'Day 2: Back ',
        goal: 'Build 3D back look. Intensity: Focus on controlled reps.',
        exercises: [
          { name: 'Barbell Row (Heavy)', sets: 4, reps: '6-8', tempo: '2-0-1-1' },
          { name: 'Seated Cable Row', sets: 3, reps: '8-10', tempo: '2-0-1-1' },
          { name: 'Lat Pulldown', sets: 3, reps: '10-12', tempo: '2-0-1-1' },
          { name: 'Deadlift (Heavy)', sets: 3, reps: '5', tempo: '1-0-1-0' },
          { name: 'Face Pull', sets: 3, reps: '12-15', tempo: '2-1-1-2' }
        ]
      },
      {
        id: 'single_shoulders',
        name: 'Day 3: Shoulders ',
        goal: 'Wide aesthetic look. Intensity: Keep strict form (no swinging).',
        exercises: [
          { name: 'Dumbbell Shoulder Press', sets: 4, reps: '8-10', tempo: '2-0-1-0' },
          { name: 'Lateral Raises (Heavy)', sets: 4, reps: '12-15', tempo: '2-0-1-1' },
          { name: 'Cable Lateral Raise', sets: 3, reps: '12-15', tempo: '2-0-1-1' },
          { name: 'Rear Delt Fly', sets: 3, reps: '12-15', tempo: '2-0-1-1' },
          { name: 'Front Raise', sets: 3, reps: '10', tempo: '2-0-1-0' }
        ]
      },
      {
        id: 'single_arms',
        name: 'Day 4: Arms',
        goal: 'Double muscle arm day: Biceps and Triceps complete development.',
        exercises: [
          { name: 'Barbell Curl (Biceps)', sets: 4, reps: '8-10', tempo: '3-0-1-0' },
          { name: 'Hammer Curl (Biceps)', sets: 3, reps: '10-12', tempo: '3-0-1-0' },
          { name: 'Concentration Curl (Biceps)', sets: 3, reps: '10', tempo: '2-0-1-1' },
          { name: 'Triceps Rope Pushdowns', sets: 4, reps: '10-12', tempo: '2-0-1-1' },
          { name: 'Overhead Tricep Extension', sets: 3, reps: '10-12', tempo: '2-0-1-0' },
          { name: 'Dips (Triceps focus)', sets: 3, reps: 'Failure', tempo: '2-0-1-0' }
        ]
      },
      {
        id: 'single_legs',
        name: 'Day 5: Legs',
        goal: 'Build symmetrical lower structure and burn high metabolic calories.',
        exercises: [
          { name: 'Back Squat', sets: 4, reps: '6-8', tempo: '3-1-1-0' },
          { name: 'Leg Press', sets: 3, reps: '10', tempo: '2-0-1-0' },
          { name: 'Hamstring Curl', sets: 3, reps: '12', tempo: '2-0-1-1' },
          { name: 'Calf Raise', sets: 4, reps: '15', tempo: '2-1-1-2' }
        ]
      },
      {
        id: 'single_abs',
        name: 'Abs Routine (Perform 3x / Week)',
        goal: 'Core stability, abdominal block shape and lower back support.',
        exercises: [
          { name: 'Hanging Leg Raise', sets: 3, reps: '12-15', tempo: 'Static' },
          { name: 'Cable Crunch', sets: 3, reps: '15', tempo: '2-0-1-1' },
          { name: 'Plank Hold', sets: 3, reps: '45s', tempo: 'Static' }
        ]
      }
    ]
  }
};

export default function Workouts({ fitnessLevel: _fitnessLevel }) {
  // Load split selection and session from localStorage or set defaults
  const [selectedSplit, setSelectedSplit] = useState(() => {
    const savedSplit = localStorage.getItem('forge_selected_split');
    return savedSplit && SPLITS[savedSplit] ? savedSplit : 'ppl';
  });

  const currentSplit = SPLITS[selectedSplit];

  const [activeSessionId, setActiveSessionId] = useState(() => {
    const savedSession = localStorage.getItem(`forge_active_session_${selectedSplit}`);
    if (savedSession) return savedSession;
    return currentSplit.sessions[0]?.id || '';
  });

  // Keep track of logged sets
  const [completedSets, setCompletedSets] = useState(() => {
    const saved = localStorage.getItem('forge_completed_sets');
    return saved ? JSON.parse(saved) : {};
  });

  // Whenever the split changes, update active session
  const handleSplitChange = (splitKey) => {
    setSelectedSplit(splitKey);
    localStorage.setItem('forge_selected_split', splitKey);

    const savedSession = localStorage.getItem(`forge_active_session_${splitKey}`);
    const nextSessionId = savedSession || SPLITS[splitKey].sessions[0]?.id || '';
    setActiveSessionId(nextSessionId);
  };

  const handleSessionChange = (sessionId) => {
    setActiveSessionId(sessionId);
    localStorage.setItem(`forge_active_session_${selectedSplit}`, sessionId);
  };

  const handleToggleSet = (exerciseName, setIdx) => {
    const key = `${activeSessionId}_${exerciseName}_${setIdx}`;
    const updated = {
      ...completedSets,
      [key]: !completedSets[key]
    };
    setCompletedSets(updated);
    localStorage.setItem('forge_completed_sets', JSON.stringify(updated));
  };

  const activeSession = currentSplit.sessions.find(s => s.id === activeSessionId) || currentSplit.sessions[0];

  const clearSessionLogs = () => {
    const updated = { ...completedSets };
    activeSession.exercises.forEach(ex => {
      const setTarget = typeof ex.sets === 'number' ? ex.sets : 3;
      for (let i = 0; i < setTarget; i++) {
        delete updated[`${activeSessionId}_${ex.name}_${i}`];
      }
    });
    setCompletedSets(updated);
    localStorage.setItem('forge_completed_sets', JSON.stringify(updated));
  };

  // Helper to determine which posture image to load based on active session ID
  const getPostureImage = (sessionId) => {
    const sId = sessionId.toLowerCase();
    if (sId.includes('chest')) return '/posture_chest.png';
    if (sId.includes('back')) return '/posture_back.png';
    if (sId.includes('shoulder')) return '/posture_shoulders.png';
    if (sId.includes('arm')) return '/posture_arms.png';
    if (sId.includes('leg')) return '/posture_legs.png';
    if (sId.includes('abs')) return '/posture_abs.png';
    // Fallbacks for PPL and Double split
    if (sId.includes('push')) return '/posture_chest.png';
    if (sId.includes('pull')) return '/posture_back.png';
    return '/posture_legs.png';
  };

  // Helper to determine posture image based on the exercise name
  const getExercisePostureImage = (exerciseName) => {
    const name = exerciseName.toLowerCase();
    
    // Chest exercises
    if (name.includes('press') && (name.includes('bench') || name.includes('dumbbell') || name.includes('barbell') || name.includes('incline') || name.includes('decline') || name.includes('flat'))) {
      if (name.includes('shoulder') || name.includes('military') || name.includes('overhead')) {
        return '/posture_shoulders.png';
      }
      return '/posture_chest.png';
    }
    if (name.includes('fly') && !name.includes('rear') && !name.includes('delt')) return '/posture_chest.png';
    if (name.includes('dips') && name.includes('chest')) return '/posture_chest.png';
    if (name.includes('push-up')) return '/posture_chest.png';
    if (name.includes('cable crossover')) return '/posture_chest.png';
    
    // Back exercises
    if (name.includes('row')) return '/posture_back.png';
    if (name.includes('pulldown') || name.includes('pull-up') || name.includes('chin-up')) return '/posture_back.png';
    if (name.includes('deadlift')) return '/posture_back.png';
    if (name.includes('face pull')) return '/posture_back.png';
    if (name.includes('hyperextension')) return '/posture_back.png';
    
    // Shoulder exercises
    if (name.includes('shoulder') || name.includes('overhead') || name.includes('military')) return '/posture_shoulders.png';
    if (name.includes('lateral raise') || name.includes('front raise') || name.includes('rear delt')) return '/posture_shoulders.png';
    if (name.includes('shrug')) return '/posture_shoulders.png';
    if (name.includes('upright row')) return '/posture_shoulders.png';
    
    // Arm exercises (Biceps, Triceps, Forearms)
    if (name.includes('curl')) return '/posture_arms.png';
    if (name.includes('pushdown') || name.includes('extension') || name.includes('dips') || name.includes('skull crusher') || (name.includes('bench') && name.includes('close'))) {
      return '/posture_arms.png';
    }
    
    // Leg exercises
    if (name.includes('squat') || name.includes('press') || name.includes('lunge')) return '/posture_legs.png';
    if (name.includes('calf') || name.includes('hamstring') || name.includes('leg curl') || name.includes('leg extension')) {
      return '/posture_legs.png';
    }
    
    // Core/Abs
    if (name.includes('leg raise') || name.includes('crunch') || name.includes('plank') || name.includes('hold') || name.includes('ab')) {
      return '/posture_abs.png';
    }
    
    return null;
  };

  return (
    <div className="module-detail">
      <div className="wrap">
        <h2 className="display" style={{ fontSize: '32px', marginBottom: '10px' }}>
          Plate 03 <span>/</span> Train
        </h2>
        <p style={{ color: 'var(--steel)', marginBottom: '35px', maxWidth: '600px' }}>
          Select your training split configuration and manage your active workout session below. Log your sets in real-time.
        </p>

        {/* 1. SPLIT SELECTOR */}
        <div style={{ marginBottom: '35px' }}>
          <label className="mono" style={{ fontSize: '11px', color: 'var(--steel)', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
            Choose Training Split Structure
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
            {Object.keys(SPLITS).map((key) => {
              const split = SPLITS[key];
              const isSelected = key === selectedSplit;
              return (
                <button
                  key={key}
                  onClick={() => handleSplitChange(key)}
                  className={`selector-card ${isSelected ? 'selected' : ''}`}
                  style={{
                    display: 'block',
                    width: '100%',
                    border: isSelected ? '1px solid var(--vital)' : '1px solid var(--line)',
                    background: isSelected ? 'var(--concrete-2)' : 'var(--graphite)',
                    padding: '20px',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <h4 style={{ fontSize: '16px', color: isSelected ? 'var(--vital)' : 'var(--chalk)', margin: 0, textTransform: 'uppercase' }}>
                    {split.name}
                  </h4>
                  <p style={{ fontSize: '12px', color: 'var(--steel)', marginTop: '8px', lineHeight: '1.4' }}>
                    {split.schedule} — {split.focus}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* DETAILS GRID */}
        <div className="detail-grid">
          {/* Split Info & Session Selector */}
          <div className="panel">
            <h3 className="panel-title">Split <span>Specs</span></h3>
            
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '20px', textTransform: 'uppercase' }}>{currentSplit.name}</h4>
              <p style={{ color: 'var(--steel)', fontSize: '13.5px', marginTop: '6px', lineHeight: '1.6' }}>
                {currentSplit.desc}
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--line)', paddingTop: '20px', marginBottom: '24px' }}>
              <label htmlFor="session-select" className="mono" style={{ fontSize: '11px', color: 'var(--vital)', display: 'block', marginBottom: '8px' }}>
                SELECT ACTIVE SESSION
              </label>
              <select
                id="session-select"
                value={activeSessionId}
                onChange={(e) => handleSessionChange(e.target.value)}
                className="form-control"
                style={{
                  background: 'var(--graphite)',
                  color: 'var(--chalk)',
                  fontSize: '15px',
                  fontWeight: '600',
                  border: '1px solid var(--vital)'
                }}
              >
                {currentSplit.sessions.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* DYNAMIC POSTURE ILLUSTRATION PREVIEW */}
            <div style={{ borderTop: '1px solid var(--line)', paddingTop: '20px', marginTop: '20px' }}>
              <label className="mono" style={{ fontSize: '11px', color: 'var(--vital)', display: 'block', marginBottom: '10px' }}>
                TARGET POSTURE GUIDE
              </label>
              <div style={{ background: 'var(--graphite)', border: '1px solid var(--line)', padding: '12px', borderRadius: '4px', textAlign: 'center' }}>
                <img 
                  src={getPostureImage(activeSessionId)} 
                  alt="Muscle posture mechanical guide" 
                  style={{ width: '100%', maxHeight: '200px', objectFit: 'contain', borderRadius: '2px', border: '1px solid rgba(255, 90, 43, 0.15)' }} 
                />
                <div className="mono" style={{ fontSize: '9px', color: 'var(--steel)', marginTop: '8px' }}>
                  // POSTURE & MUSCLE RECRUITMENT PATHWAY
                </div>
              </div>
            </div>
          </div>

          {/* ACTIVE WORKOUT TRACKER */}
          <div className="panel" style={{ borderLeft: '3px solid var(--vital)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--line)', paddingBottom: '12px' }}>
              <h3 style={{ fontSize: '20px', margin: 0 }}>Active <span>Session</span></h3>
              <button 
                onClick={clearSessionLogs}
                className="mono" 
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--steel)',
                  fontSize: '11px',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                CLEAR SESSION LOG
              </button>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <div className="mono" style={{ fontSize: '11px', color: 'var(--vital)', textTransform: 'uppercase' }}>Current Routine</div>
              <h4 style={{ fontSize: '18px', marginTop: '4px', textTransform: 'uppercase', color: 'var(--chalk)' }}>{activeSession?.name}</h4>
              {activeSession?.goal && (
                <p style={{ color: 'var(--sage)', fontSize: '12px', marginTop: '6px', fontStyle: 'italic', lineHeight: '1.4' }}>
                  Goal: {activeSession.goal}
                </p>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '25px' }}>
              {activeSession?.exercises.map((ex, index) => {
                // Count completed sets
                let completedCount = 0;
                const setTarget = typeof ex.sets === 'number' ? ex.sets : 3;
                for (let i = 0; i < setTarget; i++) {
                  if (completedSets[`${activeSessionId}_${ex.name}_${i}`]) {
                    completedCount++;
                  }
                }

                const postureImg = getExercisePostureImage(ex.name) || getPostureImage(activeSessionId);

                return (
                  <div key={index} style={{
                    background: 'var(--concrete-2)',
                    border: '1px solid var(--line)',
                    padding: '16px',
                    borderRadius: '2px',
                    display: 'flex',
                    gap: '15px',
                    alignItems: 'center'
                  }}>
                    {/* Left: exercise-specific posture thumbnail */}
                    <div style={{
                      width: '60px',
                      height: '60px',
                      background: 'var(--graphite)',
                      border: '1px solid rgba(255, 90, 43, 0.2)',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      overflow: 'hidden'
                    }}>
                      <img 
                        src={postureImg} 
                        alt={`${ex.name} posture`} 
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                      />
                    </div>

                    {/* Right: exercise details and set tracking */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <h4 style={{ fontSize: '15px', color: 'var(--chalk)', margin: 0 }}>{ex.name}</h4>
                          <p style={{ color: 'var(--steel)', fontSize: '11px', marginTop: '4px' }}>
                            Target: {ex.sets} Sets x {ex.reps} Reps | Tempo: {ex.tempo}
                          </p>
                        </div>
                        <span className="mono" style={{ fontSize: '11px', color: completedCount === setTarget ? 'var(--sage)' : 'var(--vital)', marginLeft: '10px' }}>
                          {completedCount}/{setTarget} SETS
                        </span>
                      </div>

                      {/* Checkbox Rows for sets */}
                      <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                        {Array.from({ length: setTarget }).map((_, setIndex) => {
                          const isDone = completedSets[`${activeSessionId}_${ex.name}_${setIndex}`];
                          return (
                            <button
                              key={setIndex}
                              type="button"
                              onClick={() => handleToggleSet(ex.name, setIndex)}
                              style={{
                                flex: 1,
                                minWidth: '50px',
                                padding: '6px 8px',
                                background: isDone ? 'var(--vital-dim)' : 'var(--graphite)',
                                border: isDone ? '1px solid var(--vital)' : '1px solid var(--line)',
                                color: isDone ? 'var(--chalk)' : 'var(--steel)',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '10px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                borderRadius: '2px',
                                transition: 'all 0.15s'
                              }}
                            >
                              SET {setIndex + 1} {isDone ? '✓' : ''}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
