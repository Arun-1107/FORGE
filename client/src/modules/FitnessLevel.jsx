import React from 'react';

const FITNESS_LEVELS = [
  {
    id: 'beginner',
    title: 'Beginner',
    tag: 'Introductory',
    desc: 'Brand new to resistance training or returning after a long layoff. Focus is on motor skills, joint stability, and form.'
  },
  {
    id: 'active',
    title: 'Active',
    tag: 'GPP / Health',
    desc: 'Regularly active in sports or moderate exercise. Aims to improve conditioning, muscular endurance, and movement efficiency.'
  },
  {
    id: 'bodybuilding',
    title: 'Bodybuilder',
    tag: 'Hypertrophy',
    desc: 'Aims to increase lean muscle mass and optimize aesthetic composition. Emphasizes targeted volume, isolation, and split routines.'
  },
  {
    id: 'fit',
    title: 'Fit / Athletic',
    tag: 'Performance',
    desc: 'High work capacity, experienced with heavy compounds. Focus is on strength output, power production, and metabolic conditioning.'
  }
];

export default function FitnessLevel({ selectedLevel, onSelect }) {
  return (
    <div className="module-detail">
      <div className="wrap">
        <h2 className="display" style={{ fontSize: '32px', marginBottom: '10px' }}>
          Plate 02 <span>/</span> Classify
        </h2>
        <p style={{ color: 'var(--steel)', marginBottom: '40px', maxWidth: '600px' }}>
          Your physical background and goals dictate the type of loading schemes and programs FORGE will serve. Selecting a card instantly updates your training recommendations.
        </p>

        <div className="detail-grid">
          {/* Card Selection */}
          <div className="panel" style={{ gridColumn: 'span 2' }}>
            <h3 className="panel-title">Choose <span>Fitness Classification</span></h3>
            
            <div className="selector-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              {FITNESS_LEVELS.map((lvl) => (
                <div
                  key={lvl.id}
                  className={`selector-card ${selectedLevel === lvl.id ? 'selected' : ''}`}
                  onClick={() => onSelect(lvl.id)}
                >
                  <span className="mono" style={{ fontSize: '10px', color: 'var(--vital)', display: 'block', marginBottom: '10px' }}>
                    {lvl.tag}
                  </span>
                  <h4>{lvl.title}</h4>
                  <p style={{ marginTop: '8px', lineHeight: '1.5' }}>{lvl.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--line)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="mono" style={{ fontSize: '12px', color: 'var(--steel)' }}>
                Active Classification: <strong style={{ color: 'var(--vital)', textTransform: 'uppercase' }}>{selectedLevel}</strong>
              </span>
              <span className="mono" style={{ fontSize: '11px', color: 'var(--vital-dim)' }}>
                // db.fitness.updateOne(...)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
