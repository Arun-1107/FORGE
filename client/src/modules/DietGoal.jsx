import React from 'react';

const DIET_GOALS = [
  {
    id: 'weight-loss',
    title: 'Weight Loss',
    tag: 'Aggressive Deficit',
    desc: 'Focuses on maximum weight reduction by establishing a larger caloric deficit. Best for individuals aiming to reduce gross body weight rapidly.'
  },
  {
    id: 'fat-loss',
    title: 'Fat Loss',
    tag: 'Recomposition',
    desc: 'Establishes a moderate caloric deficit while keeping protein high. Designed to strip body fat while preserving lean muscle mass.'
  },
  {
    id: 'body-recomposition',
    title: 'Body Recomposition',
    tag: 'Gain Muscle & Lose Fat',
    desc: 'Establishes a maintenance or near-maintenance caloric target with elevated protein. Designed to simultaneously build lean muscle and reduce body fat.'
  },
  {
    id: 'weight-gain',
    title: 'Weight Gain',
    tag: 'Caloric Surplus',
    desc: 'Provides a larger caloric surplus to maximize mass accretion and strength output. Suitable for building base power and bulk.'
  },
  {
    id: 'muscle-gain',
    title: 'Muscle Gain',
    tag: 'Lean Bulking',
    desc: 'Establishes a controlled, lean caloric surplus to optimize muscle hypertrophy while minimizing fat retention.'
  }
];

export default function DietGoal({ selectedGoal, onSelect }) {
  return (
    <div className="module-detail">
      <div className="wrap">
        <h2 className="display" style={{ fontSize: '32px', marginBottom: '10px' }}>
          Plate 06 <span>/</span> Goal
        </h2>
        <p style={{ color: 'var(--steel)', marginBottom: '40px', maxWidth: '600px' }}>
          Your nutritional target drives the entire metabolic strategy. A single goal ensures clear, unconflicted feedback for calories and macro calculations.
        </p>

        <div className="detail-grid">
          {/* Diet Goal Options */}
          <div className="panel" style={{ gridColumn: 'span 2' }}>
            <h3 className="panel-title">Choose <span>Diet Strategy</span></h3>
            
            <div className="selector-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              {DIET_GOALS.map((goal) => (
                <div
                  key={goal.id}
                  className={`selector-card ${selectedGoal === goal.id ? 'selected' : ''}`}
                  onClick={() => onSelect(goal.id)}
                >
                  <span className="mono" style={{ fontSize: '10px', color: 'var(--vital)', display: 'block', marginBottom: '10px' }}>
                    {goal.tag}
                  </span>
                  <h4>{goal.title}</h4>
                  <p style={{ marginTop: '8px', lineHeight: '1.5' }}>{goal.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--line)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="mono" style={{ fontSize: '12px', color: 'var(--steel)' }}>
                Active Target Strategy: <strong style={{ color: 'var(--vital)', textTransform: 'uppercase' }}>{selectedGoal.replace('-', ' ')}</strong>
              </span>
              <span className="mono" style={{ fontSize: '11px', color: 'var(--vital-dim)' }}>
                // db.diet.updateOne(...)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
