import React, { useState } from 'react';

export default function Profile({ profile, onSave, fitnessLevel }) {
  const [formData, setFormData] = useState({ ...profile });
  const [saved, setSaved] = useState(false);
  const [customImage, setCustomImage] = useState(() => localStorage.getItem('forge_progress_photo') || null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImage(reader.result);
        localStorage.setItem('forge_progress_photo', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setCustomImage(null);
    localStorage.removeItem('forge_progress_photo');
  };

  const showAssessment = fitnessLevel === 'beginner' || fitnessLevel === 'bodybuilding' || fitnessLevel === 'fit';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="module-detail">
      <div className="wrap">
        <h2 className="display" style={{ fontSize: '32px', marginBottom: '10px' }}>
          Plate 01 <span>/</span> Entry
        </h2>
        <p style={{ color: 'var(--steel)', marginBottom: '40px', maxWidth: '600px' }}>
          Your profile parameters form the foundation of the FORGE algorithm. All calculations and recommendations in other plates dynamically adapt to these metrics.
        </p>

        <div className="detail-grid">
          {/* Form Panel */}
          <div className="panel">
            <h3 className="panel-title">Update <span>Profile</span></h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  required
                />
              </div>

              <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    className="form-control"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Years"
                    min="1"
                    max="120"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="bodyfat">Body Fat %</label>
                  <input
                    type="number"
                    id="bodyfat"
                    name="bodyfat"
                    className="form-control"
                    value={formData.bodyfat}
                    onChange={handleChange}
                    placeholder="Est. %"
                    min="1"
                    max="60"
                    required
                  />
                </div>
              </div>

              <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label htmlFor="height">Height (cm)</label>
                  <input
                    type="number"
                    id="height"
                    name="height"
                    className="form-control"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="cm"
                    min="50"
                    max="250"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="weight">Weight (kg)</label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    className="form-control"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="kg"
                    min="20"
                    max="300"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-submit">
                Save &amp; Recalibrate
              </button>

              {saved && (
                <div className="success-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Profile updated. System recalibrated.
                </div>
              )}
            </form>
          </div>

          {/* Current Settings Display */}
          <div className="panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 className="panel-title">Active <span>Metrics</span></h3>
              <p style={{ color: 'var(--steel)', fontSize: '13.5px', marginBottom: '24px', lineHeight: '1.6' }}>
                These are the live metrics stored in your current session database. Changes here automatically adjust your targets across workouts, meal allocations, and supplements.
              </p>

              <div className="stats-display">
                <div className="stat-box">
                  <div className="lbl">Identity</div>
                  <div className="val" style={{ fontSize: '20px', textTransform: 'uppercase', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {profile.name || 'Anonymous'}
                  </div>
                </div>
                <div className="stat-box">
                  <div className="lbl">Age Group</div>
                  <div className="val">
                    {profile.age ? `${profile.age}` : '--'} <span>yrs</span>
                  </div>
                </div>
                <div className="stat-box">
                  <div className="lbl">Stature</div>
                  <div className="val">
                    {profile.height ? `${profile.height}` : '--'} <span>cm</span>
                  </div>
                </div>
                <div className="stat-box">
                  <div className="lbl">Mass</div>
                  <div className="val">
                    {profile.weight ? `${profile.weight}` : '--'} <span>kg</span>
                  </div>
                </div>
                <div className="stat-box" style={{ gridColumn: 'span 2' }}>
                  <div className="lbl">Body Composition (Body Fat)</div>
                  <div className="val" style={{ color: 'var(--vital)' }}>
                    {profile.bodyfat ? `${profile.bodyfat}` : '--'} <span>% BF</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '24px', borderTop: '1px solid var(--line)', paddingTop: '20px' }}>
              <span className="mono" style={{ fontSize: '11px', color: 'var(--vital)' }}>
                // db.users.find({`{ id: active }`})
              </span>
            </div>
          </div>
        </div>

        {/* PHYSIQUE ASSESSMENT PANEL (GATED TO BEGINNER & ADVANCED) */}
        {showAssessment && (
          <div className="panel" style={{ marginTop: '40px', borderLeft: '4px solid var(--vital)' }}>
            <h3 className="panel-title">Physique <span>Assessment</span></h3>
            <div className="detail-grid" style={{ gap: '30px', alignItems: 'center' }}>
              
              {/* Optional Photo Upload and Preview */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                <div style={{ background: 'var(--graphite)', border: '1px solid var(--line)', padding: '15px', borderRadius: '4px', display: 'flex', justifyContent: 'center', width: '100%', minHeight: '300px', alignItems: 'center' }}>
                  <img 
                    src={customImage || "/men_physique.png"} 
                    alt="Men client physique assessment" 
                    style={{ width: '100%', maxWidth: '280px', height: 'auto', borderRadius: '2px', border: '1px solid rgba(255, 90, 43, 0.15)', objectFit: 'contain' }} 
                  />
                </div>
                
                <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                  <label htmlFor="physique-upload" className="btn-ghost" style={{ flex: 1, padding: '10px', fontSize: '11px', textAlign: 'center', cursor: 'pointer', display: 'inline-block', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                    {customImage ? 'CHANGE PHOTO' : 'UPLOAD PHOTO (OPTIONAL)'}
                  </label>
                  <input 
                    type="file" 
                    id="physique-upload" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    style={{ display: 'none' }} 
                  />
                  {customImage && (
                    <button 
                      type="button"
                      onClick={clearImage} 
                      className="mono" 
                      style={{ padding: '8px 12px', fontSize: '10px', background: 'transparent', border: '1px solid var(--vital)', color: 'var(--vital)', cursor: 'pointer' }}
                    >
                      RESET
                    </button>
                  )}
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '18px', color: 'var(--chalk)', marginBottom: '12px' }}>Privacy-First Structural Weak Spot Identification</h4>
                <p style={{ color: 'var(--steel)', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
                  FORGE utilizes progress pictures taken <strong>without the head or face</strong> to guarantee complete privacy and avoid any external circumstances.
                </p>
                <p style={{ color: 'var(--steel)', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
                  Analyzing a faceless physique photo helps coaches, trainers, and athletes objectively inspect muscular balance, symmetry, and development. This process is essential for noticing and targeting physical <strong>weak spots</strong> (such as rear shoulder development, lower back alignment, or quad sweep imbalances) so you can arrange and customize your splits to cover these lags.
                </p>
                <div className="mono" style={{ fontSize: '12.5px', color: 'var(--vital)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ display: 'inline-block', width: '8px', height: '8px', background: 'var(--sage)', borderRadius: '50%' }}></span>
                  {customImage ? 'Status: Custom Progress Photo Active' : 'Status: Default Model Loaded (Upload Optional)'}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
