import React, { useState } from 'react';

export default function AdultZone({ isVerified, onVerify }) {
  const [birthYear, setBirthYear] = useState('');
  const [stageAgreed, setStageAgreed] = useState(false);
  const [activeTab, setActiveTab] = useState('what-is-it');
  const [error, setError] = useState('');

  const currentYear = new Date().getFullYear();

  const handleVerify = (e) => {
    e.preventDefault();
    const yearNum = parseInt(birthYear);
    if (!yearNum || yearNum < 1900 || yearNum > currentYear) {
      setError('Please enter a valid birth year.');
      return;
    }

    const age = currentYear - yearNum;
    if (age < 18) {
      setError('Access Restricted: You must be 18 years or older to view this educational content.');
      return;
    }

    if (!stageAgreed) {
      setError('Agreement Required: You must verify that you are accessing this for stage purposes only.');
      return;
    }

    onVerify(true);
    setError('');
  };

  return (
    <div className="module-detail">
      <div className="wrap">
        <h2 className="display" style={{ fontSize: '32px', marginBottom: '10px' }}>
          Plate 07 <span>/</span> Restricted
        </h2>
        <p style={{ color: 'var(--steel)', marginBottom: '40px', maxWidth: '600px' }}>
          Age-gated educational zone focusing on harm reduction, physiological risks, and medical references regarding performance-enhancing substances.
        </p>

        {!isVerified ? (
          /* Age Gate Panel */
          <div className="age-gate" style={{ maxWidth: '540px', padding: '40px 30px' }}>
            <div className="age-gate-icon">🔞</div>
            <h3 style={{ marginBottom: '15px' }}>Age &amp; Purpose Verification</h3>
            <p style={{ marginBottom: '25px', fontSize: '13.5px' }}>
              This section contains information regarding anabolic substances, their physiological risks, and legal implications. Access is permitted strictly for stage-preparation education.
            </p>
            
            <form onSubmit={handleVerify}>
              {/* Birth Year Input */}
              <div className="form-group" style={{ maxWidth: '280px', margin: '0 auto 20px' }}>
                <label htmlFor="birthYear" style={{ color: 'var(--steel)' }}>Enter Birth Year</label>
                <input
                  type="number"
                  id="birthYear"
                  className="form-control"
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  placeholder="YYYY"
                  min="1900"
                  max={currentYear}
                  required
                  style={{ textAlign: 'center', fontSize: '18px', letterSpacing: '0.1em' }}
                />
              </div>

              {/* Stage Purpose Mandatory Checkbox */}
              <div className="form-group" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', textAlign: 'left', margin: '20px auto 25px', maxWidth: '380px' }}>
                <input
                  type="checkbox"
                  id="stageAgreement"
                  checked={stageAgreed}
                  onChange={(e) => setStageAgreed(e.target.checked)}
                  required
                  style={{ 
                    marginTop: '4px', 
                    cursor: 'pointer',
                    accentColor: 'var(--vital)',
                    width: '18px',
                    height: '18px'
                  }}
                />
                <label htmlFor="stageAgreement" style={{ fontSize: '12px', color: 'var(--steel)', cursor: 'pointer', textTransform: 'none', fontFamily: 'var(--font-body)', lineHeight: '1.5' }}>
                  I confirm and agree that I am accessing this information <strong>strictly for bodybuilding stage/competition purposes</strong> and professional staging preparation.
                </label>
              </div>

              {/* Disclaimer Notice */}
              <div className="mono" style={{ fontSize: '10.5px', color: 'var(--steel)', background: 'var(--concrete-2)', padding: '12px', border: '1px solid var(--line)', marginBottom: '20px', lineHeight: '1.4' }}>
                DISCLAIMER: Exogenous hormone education is intended solely for athletic staging context. FORGE does not promote illegal substance acquisition or use.
              </div>

              {error && (
                <div style={{ color: 'var(--vital)', fontSize: '13px', marginBottom: '20px', lineHeight: '1.5', fontWeight: 'bold' }}>
                  {error}
                </div>
              )}

              <button type="submit" className="btn-primary" style={{ width: '100%', maxWidth: '280px' }}>
                Verify &amp; Enter
              </button>
            </form>
          </div>
        ) : (
          /* Educational Panel */
          <div className="detail-grid" style={{ gridTemplateColumns: '1fr' }}>
            <div className="panel">
              {/* Dynamic Prominent Disclaimer at the top of Verified Content */}
              <div className="warning-banner" style={{ borderLeft: '4px solid var(--vital)', background: 'rgba(255, 90, 43, 0.05)', padding: '20px', marginBottom: '30px' }}>
                <strong style={{ color: 'var(--vital)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
                  ⚠️ STAGE USE ONLY &amp; LIABILITY DISCLAIMER
                </strong>
                <p style={{ fontSize: '13px', color: 'var(--chalk)', margin: 0, lineHeight: '1.6' }}>
                  <strong>FORGE Stage-Only Directive:</strong> All hormone profiles, androgenic metrics, and related compounds covered in this section are presented strictly for athletic stage staging and competition optimization context. Exogenous enhancement carries severe physiological risks, is illegal without a prescription, and should not be pursued outside of professional competition preparation. This educational material is for stage purposes only.
                </p>
              </div>

              <div className="warning-banner">
                <strong>HARM REDUCTION NOTICE</strong>
                FORGE does not promote, endorse, or supply anabolic androgenic steroids (AAS). This section serves exclusively as a scientific and health-focused educational resource outlining the medical risks and physiological impacts of these compounds. Dosing or sourcing coordinates are strictly prohibited.
              </div>

              <div className="edu-tabs">
                <button
                  className={`edu-tab ${activeTab === 'what-is-it' ? 'active' : ''}`}
                  onClick={() => setActiveTab('what-is-it')}
                >
                  Substance Class
                </button>
                <button
                  className={`edu-tab ${activeTab === 'risks' ? 'active' : ''}`}
                  onClick={() => setActiveTab('risks')}
                >
                  Physiological Risks
                </button>
                <button
                  className={`edu-tab ${activeTab === 'harm-reduction' ? 'active' : ''}`}
                  onClick={() => setActiveTab('harm-reduction')}
                >
                  Medical References
                </button>
              </div>

              <div className="edu-content" style={{ minHeight: '260px' }}>
                {activeTab === 'what-is-it' && (
                  <div>
                    <h4>Anabolic Androgenic Steroids (AAS)</h4>
                    <p>
                      Anabolic-androgenic steroids (AAS) are synthetic derivatives of testosterone, a naturally occurring male sex hormone. They are categorized by two primary properties:
                    </p>
                    <ul>
                      <li><strong>Anabolic:</strong> Promotes muscle growth (protein synthesis), bone density, and recovery.</li>
                      <li><strong>Androgenic:</strong> Develops male secondary sexual characteristics (deepening of voice, facial hair growth, virilization).</li>
                    </ul>
                    <p>
                      In clinical medicine, AAS are prescribed for specific conditions such as testosterone replacement therapy (TRT) for hypogonadism, muscle wasting diseases (cachexia) associated with HIV/cancer, and certain types of anemia. Non-medical usage for performance enhancement falls outside standard medical protocols and carries heavy physiological side effects.
                    </p>
                  </div>
                )}

                {activeTab === 'risks' && (
                  <div>
                    <h4>Physiological Risks &amp; Complications</h4>
                    <p>
                      Supra-physiological doses of anabolic steroids disrupt multiple organ systems. Standard side effects include:
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginTop: '16px' }}>
                      <div>
                        <strong style={{ color: 'var(--vital)' }}>1. Cardiovascular Strain</strong>
                        <p style={{ fontSize: '13px', marginTop: '4px' }}>
                          Substances significantly alter lipid profiles, raising LDL (bad cholesterol) and lowering HDL (good cholesterol). This accelerates arterial plaque buildup (atherosclerosis), increases blood pressure, and leads to left ventricular hypertrophy (enlargement of the heart muscle), substantially raising the risk of heart attacks and strokes.
                        </p>
                      </div>
                      <div>
                        <strong style={{ color: 'var(--vital)' }}>2. Endocrine Shutdown</strong>
                        <p style={{ fontSize: '13px', marginTop: '4px' }}>
                          Exogenous hormones trigger a negative feedback loop in the pituitary gland, shutting down natural luteinizing hormone (LH) and follicle-stimulating hormone (FSH) production. This leads to testicular atrophy, infertility, and chronic hypogonadism (low testosterone) upon cessation.
                        </p>
                      </div>
                      <div>
                        <strong style={{ color: 'var(--vital)' }}>3. Hepatotoxicity (Liver Strain)</strong>
                        <p style={{ fontSize: '13px', marginTop: '4px' }}>
                          Oral anabolic steroids (specifically 17-alpha-alkylated compounds) pass through the liver, causing elevated liver enzymes, liver strain, cholestatic jaundice, and in rare cases, liver tumors or peliosis hepatis.
                        </p>
                      </div>
                      <div>
                        <strong style={{ color: 'var(--vital)' }}>4. Dermatological &amp; Psychological</strong>
                        <p style={{ fontSize: '13px', marginTop: '4px' }}>
                          Severe acne, accelerated male pattern baldness (in genetically predisposed individuals), fluid retention, mood swings, increased aggression ("roid rage"), and post-cycle depression.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'harm-reduction' && (
                  <div>
                    <h4>Harm Reduction &amp; Legality</h4>
                    <p>
                      Under the Controlled Substances Act, anabolic steroids are classified as Schedule III controlled substances in the United States and class C in the UK. Possession or distribution without a valid medical prescription is illegal and subject to criminal prosecution.
                    </p>
                    <p><strong>Fundamental Harm Reduction Guidelines:</strong></p>
                    <ul>
                      <li><strong>Routine Diagnostics:</strong> Periodic venous blood panels (CBC, Lipid profile, Liver and Kidney panels, Hormonal status) are mandatory to monitor internal biomarkers.</li>
                      <li><strong>Medical Oversight:</strong> Any endocrinological dysfunction should be monitored by qualified medical specialists rather than self-managed.</li>
                      <li><strong>Natural Potentials:</strong> Maximize training intensity, nutrition macros, sleep quality, and supplementation profiles before assessing further adaptogens.</li>
                    </ul>
                  </div>
                )}
              </div>

              <div style={{ borderTop: '1px solid var(--line)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <button
                  className="btn-back"
                  style={{ margin: 0, padding: '6px 12px', fontSize: '10px' }}
                  onClick={() => onVerify(false)}
                >
                  Reset Verification
                </button>
                <span className="mono" style={{ fontSize: '11px', color: 'var(--vital-dim)' }}>
                  // db.educational.find({`{ category: "AAS" }`})
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
