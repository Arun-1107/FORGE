import React, { useState, useEffect } from 'react';

export default function Supplements({ profile, fitnessLevel }) {
  const weight = parseFloat(profile.weight) || 75;
  const proteinTarget = weight * 2.0;

  // Dynamic recommendations
  const needsProteinPowder = proteinTarget > 130;
  const needsCreatine = fitnessLevel === 'bodybuilding' || fitnessLevel === 'fit';

  // Toggle state with lazy loading from localStorage
  const [selected, setSelected] = useState(() => {
    const saved = localStorage.getItem('forge_selected_supplements');
    if (saved) return JSON.parse(saved);
    return null;
  });

  // Set default selection based on profile recommendations if no saved state exists
  useEffect(() => {
    if (selected === null) {
      const defaultState = {
        whey: needsProteinPowder,
        creatine: needsCreatine,
        d3k2: true,
        omega3: true,
        zma: true
      };
      setSelected(defaultState);
      localStorage.setItem('forge_selected_supplements', JSON.stringify(defaultState));
    }
  }, [needsProteinPowder, needsCreatine, selected]);

  const activeSelection = selected || {
    whey: needsProteinPowder,
    creatine: needsCreatine,
    d3k2: true,
    omega3: true,
    zma: true
  };

  const handleToggle = (key) => {
    const updated = { ...activeSelection, [key]: !activeSelection[key] };
    setSelected(updated);
    localStorage.setItem('forge_selected_supplements', JSON.stringify(updated));
  };

  // Get active items count
  const activeCount = Object.values(activeSelection).filter(Boolean).length;

  return (
    <div className="module-detail">
      <div className="wrap">
        <h2 className="display" style={{ fontSize: '32px', marginBottom: '10px' }}>
          Plate 05 <span>/</span> Fill Gaps
        </h2>
        <p style={{ color: 'var(--steel)', marginBottom: '30px', maxWidth: '600px' }}>
          Supplements are flagged, not forced. Some might not have a strong effect on your current phase, so you can customize and arrange your daily stack below.
        </p>

        {/* ACTIVE STACK SUMMARY PANEL */}
        <div className="panel" style={{ marginBottom: '30px', borderLeft: '4px solid var(--vital)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
            <div>
              <h3 style={{ fontSize: '22px', margin: 0 }}>My Active Supplement Stack</h3>
              <p style={{ color: 'var(--steel)', fontSize: '13px', marginTop: '4px' }}>
                Currently tracking {activeCount} of 5 supplements. Toggled items will be included in your daily protocols.
              </p>
            </div>
            <div className="mono" style={{ fontSize: '13px', background: 'var(--concrete-2)', padding: '8px 16px', border: '1px solid var(--line)', color: 'var(--vital)' }}>
              STACK TOTAL: {activeCount} ACTIVE
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
            {activeSelection.whey && <span className="pill highlighted">Whey Protein</span>}
            {activeSelection.creatine && <span className="pill highlighted">Creatine</span>}
            {activeSelection.d3k2 && <span className="pill highlighted">Vitamin D3+K2</span>}
            {activeSelection.omega3 && <span className="pill highlighted">Omega-3</span>}
            {activeSelection.zma && <span className="pill highlighted">ZMA Sleep Support</span>}
            {activeCount === 0 && <span className="mono" style={{ color: 'var(--steel)', fontSize: '13px' }}>// No supplements selected. Select options below to add to stack.</span>}
          </div>
        </div>

        <div className="detail-grid">
          {/* Whey Protein */}
          <div className="panel" style={{ 
            borderLeft: activeSelection.whey ? '3px solid var(--vital)' : '1px solid var(--line)',
            opacity: activeSelection.whey ? 1 : 0.75,
            transition: 'opacity 0.2s'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '20px', textTransform: 'uppercase' }}>Whey Protein Isolate</h3>
              <span className="mono" style={{ fontSize: '10px', background: needsProteinPowder ? 'var(--vital-dim)' : 'var(--concrete-2)', padding: '3px 8px', color: 'var(--chalk)' }}>
                {needsProteinPowder ? 'RECOMMENDED FLAG' : 'OPTIONAL BASELINE'}
              </span>
            </div>
            <p style={{ color: 'var(--steel)', fontSize: '13.5px', lineHeight: '1.6', marginBottom: '16px' }}>
              Used to supplement daily protein requirements when solid food targets are difficult to hit. Quickly absorbed, low fat, and convenient.
            </p>
            <div className="mono" style={{ fontSize: '11px', color: 'var(--vital)' }}>
              Why it's flagged:
            </div>
            <p style={{ fontSize: '13px', color: 'var(--chalk)', marginTop: '4px', lineHeight: '1.5', marginBottom: '24px' }}>
              {needsProteinPowder 
                ? `Your calculated protein target is high (${Math.round(proteinTarget)}g/day). Supplementing 1-2 scoops (25-50g) of whey isolate makes hitting this goal significantly easier without excess fats or carbs.`
                : `Your calculated protein target is moderate (${Math.round(proteinTarget)}g/day). This can be easily obtained from whole food (chicken, beef, eggs), but whey remains a convenient post-workout choice.`
              }
            </p>
            
            <button 
              type="button" 
              onClick={() => handleToggle('whey')}
              className={activeSelection.whey ? "btn-primary" : "btn-ghost"}
              style={{ width: '100%', padding: '10px 15px', fontSize: '12px' }}
            >
              {activeSelection.whey ? '✓ ACTIVE IN DAILY STACK' : '+ ADD TO DAILY STACK'}
            </button>
          </div>

          {/* Creatine Monohydrate */}
          <div className="panel" style={{ 
            borderLeft: activeSelection.creatine ? '3px solid var(--vital)' : '1px solid var(--line)',
            opacity: activeSelection.creatine ? 1 : 0.75,
            transition: 'opacity 0.2s'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '20px', textTransform: 'uppercase' }}>Creatine Monohydrate</h3>
              <span className="mono" style={{ fontSize: '10px', background: needsCreatine ? 'var(--vital-dim)' : 'var(--concrete-2)', padding: '3px 8px', color: 'var(--chalk)' }}>
                {needsCreatine ? 'HIGH PRIORITY' : 'MODERATE PRIORITY'}
              </span>
            </div>
            <p style={{ color: 'var(--steel)', fontSize: '13.5px', lineHeight: '1.6', marginBottom: '16px' }}>
              Creatine supports ATP resynthesis during short, high-intensity bursts of heavy resistance training. It increases strength output, cell hydration, and cognitive performance.
            </p>
            <div className="mono" style={{ fontSize: '11px', color: 'var(--vital)' }}>
              Why it's flagged:
            </div>
            <p style={{ fontSize: '13px', color: 'var(--chalk)', marginTop: '4px', lineHeight: '1.5', marginBottom: '24px' }}>
              To obtain the standard clinical dose of 5g creatine, you would need to consume roughly 1.1kg of raw beef daily. Supplementing with creatine monohydrate is a highly cost-efficient, practical necessity.
              {needsCreatine && " Since your fitness level is bodybuilding/fit, creatine will yield immediate adaptation benefits."}
            </p>

            <button 
              type="button" 
              onClick={() => handleToggle('creatine')}
              className={activeSelection.creatine ? "btn-primary" : "btn-ghost"}
              style={{ width: '100%', padding: '10px 15px', fontSize: '12px' }}
            >
              {activeSelection.creatine ? '✓ ACTIVE IN DAILY STACK' : '+ ADD TO DAILY STACK'}
            </button>
          </div>

          {/* Micronutrient Foundation */}
          <div className="panel" style={{ gridColumn: 'span 2' }}>
            <h3 className="panel-title">Micronutrient <span>Foundations</span></h3>
            <p style={{ color: 'var(--steel)', fontSize: '13.5px', marginBottom: '24px', lineHeight: '1.6' }}>
              These micronutrients are essential for metabolic recovery, bone density, and hormonal synthesis, but are often depleted during intensive physical training. Toggle them based on your needs.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              {/* D3 + K2 */}
              <div style={{ 
                padding: '20px', 
                background: 'var(--concrete-2)', 
                border: activeSelection.d3k2 ? '1px solid var(--vital)' : '1px solid var(--line)',
                opacity: activeSelection.d3k2 ? 1 : 0.7,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <h4 style={{ fontSize: '15px', marginBottom: '8px', color: 'var(--chalk)' }}>Vitamin D3 + K2</h4>
                  <p style={{ fontSize: '12.5px', color: 'var(--steel)', lineHeight: '1.5', marginBottom: '20px' }}>
                    Supports calcium absorption, skeletal structure, and free testosterone levels. Combined with K2 to ensure calcium routes to bones instead of arteries.
                  </p>
                </div>
                <button 
                  type="button" 
                  onClick={() => handleToggle('d3k2')}
                  className={activeSelection.d3k2 ? "btn-primary" : "btn-ghost"}
                  style={{ width: '100%', padding: '8px 12px', fontSize: '11px', marginTop: 'auto' }}
                >
                  {activeSelection.d3k2 ? '✓ ACTIVE' : '+ ADD TO STACK'}
                </button>
              </div>

              {/* Omega-3 */}
              <div style={{ 
                padding: '20px', 
                background: 'var(--concrete-2)', 
                border: activeSelection.omega3 ? '1px solid var(--vital)' : '1px solid var(--line)',
                opacity: activeSelection.omega3 ? 1 : 0.7,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <h4 style={{ fontSize: '15px', marginBottom: '8px', color: 'var(--chalk)' }}>Omega-3 Fish Oil</h4>
                  <p style={{ fontSize: '12.5px', color: 'var(--steel)', lineHeight: '1.5', marginBottom: '20px' }}>
                    Supplies EPA and DHA fatty acids. Promotes cardiovascular health, joint lubrication, and reduces systemic inflammatory markers.
                  </p>
                </div>
                <button 
                  type="button" 
                  onClick={() => handleToggle('omega3')}
                  className={activeSelection.omega3 ? "btn-primary" : "btn-ghost"}
                  style={{ width: '100%', padding: '8px 12px', fontSize: '11px', marginTop: 'auto' }}
                >
                  {activeSelection.omega3 ? '✓ ACTIVE' : '+ ADD TO STACK'}
                </button>
              </div>

              {/* ZMA */}
              <div style={{ 
                padding: '20px', 
                background: 'var(--concrete-2)', 
                border: activeSelection.zma ? '1px solid var(--vital)' : '1px solid var(--line)',
                opacity: activeSelection.zma ? 1 : 0.7,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <h4 style={{ fontSize: '15px', marginBottom: '8px', color: 'var(--chalk)' }}>ZMA (Zinc / Mag / B6)</h4>
                  <p style={{ fontSize: '12.5px', color: 'var(--steel)', lineHeight: '1.5', marginBottom: '20px' }}>
                    Promotes deeper REM sleep cycles, supports muscle recovery, and counters micronutrient depletion caused by heavy sweating.
                  </p>
                </div>
                <button 
                  type="button" 
                  onClick={() => handleToggle('zma')}
                  className={activeSelection.zma ? "btn-primary" : "btn-ghost"}
                  style={{ width: '100%', padding: '8px 12px', fontSize: '11px', marginTop: 'auto' }}
                >
                  {activeSelection.zma ? '✓ ACTIVE' : '+ ADD TO STACK'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
