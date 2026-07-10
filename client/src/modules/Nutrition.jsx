import React, { useState } from 'react';

// Preset calorie & macro dictionary per unit (piece or gram)
const FOOD_DICTIONARY = [
  { name: 'Cooked Basmati Rice', baseCalories: 1.3, baseProtein: 0.027, baseCarbs: 0.28, baseFats: 0.003, baseFiber: 0.004, unit: 'g', defaultQty: 150 },
  { name: 'Chicken Breast (Cooked)', baseCalories: 1.65, baseProtein: 0.31, baseCarbs: 0.0, baseFats: 0.036, baseFiber: 0.0, unit: 'g', defaultQty: 100 },
  { name: 'Yellow Dal (Cooked)', baseCalories: 0.98, baseProtein: 0.055, baseCarbs: 0.133, baseFats: 0.021, baseFiber: 0.039, unit: 'g', defaultQty: 150 },
  { name: 'Whole Wheat Chapati', baseCalories: 71, baseProtein: 3.0, baseCarbs: 15.0, baseFats: 0.4, baseFiber: 2.5, unit: 'piece(s)', defaultQty: 2 },
  { name: 'Whole Egg (Boiled)', baseCalories: 78, baseProtein: 6.3, baseCarbs: 0.6, baseFats: 5.3, baseFiber: 0.0, unit: 'piece(s)', defaultQty: 2 },
  { name: 'Egg Whites (Boiled)', baseCalories: 17, baseProtein: 3.6, baseCarbs: 0.2, baseFats: 0.1, baseFiber: 0.0, unit: 'piece(s)', defaultQty: 4 },
  { name: 'Whole Milk Curd / Dahi', baseCalories: 0.98, baseProtein: 0.033, baseCarbs: 0.043, baseFats: 0.043, baseFiber: 0.0, unit: 'g', defaultQty: 100 },
  { name: 'Peanut Butter', baseCalories: 5.9, baseProtein: 0.25, baseCarbs: 0.18, baseFats: 0.5, baseFiber: 0.06, unit: 'g', defaultQty: 16 },
  { name: 'Raw Oats', baseCalories: 3.8, baseProtein: 0.15, baseCarbs: 0.675, baseFats: 0.075, baseFiber: 0.1, unit: 'g', defaultQty: 40 },
  { name: 'Whey Protein Isolate', baseCalories: 3.63, baseProtein: 0.75, baseCarbs: 0.03, baseFats: 0.015, baseFiber: 0.0, unit: 'g', defaultQty: 33 },
  { name: 'Banana', baseCalories: 105, baseProtein: 1.3, baseCarbs: 27, baseFats: 0.3, baseFiber: 3.1, unit: 'piece(s)', defaultQty: 1 },
  { name: 'Dates (Khajur)', baseCalories: 20, baseProtein: 0.13, baseCarbs: 5.3, baseFats: 0.02, baseFiber: 0.5, unit: 'piece(s)', defaultQty: 4 }
];

export default function Nutrition({ profile, dietGoal }) {
  // Safe parsing values with fallback defaults
  const weight = parseFloat(profile.weight) || 75; // kg
  const bf = parseFloat(profile.bodyfat) || 15; // %

  // Calculate Lean Body Mass (LBM) if body fat is available
  const lbm = weight * (1 - (bf / 100));
  // BMR Katch-McArdle formula (most accurate when bodyfat is known)
  const bmr = Math.round(370 + (21.6 * lbm));
  // TDEE assuming moderate activity factor (1.4)
  const tdee = Math.round(bmr * 1.4);

  // Caloric adjustment based on Diet Goal
  let calorieTarget = tdee;
  let goalLabel = 'Maintain';
  
  if (dietGoal === 'weight-loss') {
    calorieTarget = tdee - 600;
    goalLabel = 'Deficit (Aggressive)';
  } else if (dietGoal === 'fat-loss') {
    calorieTarget = tdee - 400;
    goalLabel = 'Deficit (Moderate)';
  } else if (dietGoal === 'body-recomposition') {
    calorieTarget = tdee; // Maintenance for recomp
    goalLabel = 'Recomposition (Maintenance)';
  } else if (dietGoal === 'weight-gain') {
    calorieTarget = tdee + 400;
    goalLabel = 'Surplus (Aggressive)';
  } else if (dietGoal === 'muscle-gain') {
    calorieTarget = tdee + 250;
    goalLabel = 'Surplus (Lean)';
  }

  // Calculate Macros Targets
  const proteinTargetGrams = Math.round(weight * 2.0);
  const proteinTargetCalories = proteinTargetGrams * 4;
  const fatTargetGrams = Math.round(weight * 0.9);
  const fatTargetCalories = fatTargetGrams * 9;
  const remainingCalories = calorieTarget - (proteinTargetCalories + fatTargetCalories);
  const carbTargetGrams = Math.max(20, Math.round(remainingCalories / 4));

  const hasCustomProfile = profile.weight && profile.height && profile.age;

  // Step Tracker State
  const [stepCount, setStepCount] = useState(() => {
    const saved = localStorage.getItem('forge_step_count');
    return saved ? parseInt(saved, 10) : 8000;
  });

  const stepBurn = Math.round(stepCount * 0.04);
  const adjustedTdee = tdee + stepBurn;

  // Custom Diet Plan State
  const [customMeals, setCustomMeals] = useState(() => {
    const saved = localStorage.getItem('forge_custom_meals');
    return saved ? JSON.parse(saved) : {
      breakfast: [
        { name: 'Raw Oats', baseCalories: 3.8, baseProtein: 0.15, baseCarbs: 0.675, baseFats: 0.075, baseFiber: 0.1, qty: 40, unit: 'g' },
        { name: 'Banana', baseCalories: 105, baseProtein: 1.3, baseCarbs: 27, baseFats: 0.3, baseFiber: 3.1, qty: 1, unit: 'piece(s)' }
      ],
      lunch: [
        { name: 'Cooked Basmati Rice', baseCalories: 1.3, baseProtein: 0.027, baseCarbs: 0.28, baseFats: 0.003, baseFiber: 0.004, qty: 150, unit: 'g' },
        { name: 'Chicken Breast (Cooked)', baseCalories: 1.65, baseProtein: 0.31, baseCarbs: 0.0, baseFats: 0.036, baseFiber: 0.0, qty: 100, unit: 'g' }
      ],
      dinner: [
        { name: 'Whole Wheat Chapati', baseCalories: 71, baseProtein: 3.0, baseCarbs: 15.0, baseFats: 0.4, baseFiber: 2.5, qty: 2, unit: 'piece(s)' },
        { name: 'Yellow Dal (Cooked)', baseCalories: 0.98, baseProtein: 0.055, baseCarbs: 0.133, baseFats: 0.021, baseFiber: 0.039, qty: 150, unit: 'g' }
      ],
      snacks: [
        { name: 'Dates (Khajur)', baseCalories: 20, baseProtein: 0.13, baseCarbs: 5.3, baseFats: 0.02, baseFiber: 0.5, qty: 4, unit: 'piece(s)' }
      ]
    };
  });

  // Adding food interface states per meal
  const [activeAddMeal, setActiveAddMeal] = useState(null); // 'breakfast', 'lunch', etc.
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [qtyInput, setQtyInput] = useState('');
  
  // Custom Food Form states
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customUnit, setCustomUnit] = useState('g');
  const [customCal, setCustomCal] = useState('');
  const [customProt, setCustomProt] = useState('');
  const [customCarb, setCustomCarb] = useState('');
  const [customFat, setCustomFat] = useState('');
  const [customFib, setCustomFib] = useState('');

  const handleStepsChange = (e) => {
    const val = parseInt(e.target.value, 10) || 0;
    setStepCount(val);
    localStorage.setItem('forge_step_count', val.toString());
  };

  // Helper to sum macros for a list of meal items
  const getMealSum = (items) => {
    return items.reduce((acc, item) => {
      acc.calories += Math.round(item.qty * item.baseCalories);
      acc.protein += Math.round(item.qty * item.baseProtein * 10) / 10;
      acc.carbs += Math.round(item.qty * item.baseCarbs * 10) / 10;
      acc.fats += Math.round(item.qty * item.baseFats * 10) / 10;
      acc.fiber += Math.round(item.qty * item.baseFiber * 10) / 10;
      return acc;
    }, { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 });
  };

  const mealsList = ['breakfast', 'lunch', 'dinner', 'snacks'];
  
  // Daily Totals
  const dailyTotals = mealsList.reduce((acc, key) => {
    const sum = getMealSum(customMeals[key]);
    acc.calories += sum.calories;
    acc.protein += sum.protein;
    acc.carbs += sum.carbs;
    acc.fats += sum.fats;
    acc.fiber += sum.fiber;
    return acc;
  }, { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 });

  dailyTotals.calories = Math.round(dailyTotals.calories);
  dailyTotals.protein = Math.round(dailyTotals.protein);
  dailyTotals.carbs = Math.round(dailyTotals.carbs);
  dailyTotals.fats = Math.round(dailyTotals.fats);
  dailyTotals.fiber = Math.round(dailyTotals.fiber);

  // Macro percentages for consumed foods
  const totalConsumedCal = (dailyTotals.protein * 4) + (dailyTotals.fats * 9) + (dailyTotals.carbs * 4);
  const pPct = totalConsumedCal > 0 ? Math.round(((dailyTotals.protein * 4) / totalConsumedCal) * 100) : 0;
  const fPct = totalConsumedCal > 0 ? Math.round(((dailyTotals.fats * 9) / totalConsumedCal) * 100) : 0;
  const cPct = totalConsumedCal > 0 ? 100 - (pPct + fPct) : 0;

  const handleUpdateQty = (mealKey, index, newQty) => {
    const val = parseFloat(newQty);
    if (isNaN(val) || val < 0) return;
    const updated = { ...customMeals };
    updated[mealKey][index].qty = val;
    setCustomMeals(updated);
    localStorage.setItem('forge_custom_meals', JSON.stringify(updated));
  };

  const handleDeleteItem = (mealKey, index) => {
    const updated = { ...customMeals };
    updated[mealKey].splice(index, 1);
    setCustomMeals(updated);
    localStorage.setItem('forge_custom_meals', JSON.stringify(updated));
  };

  const handleOpenAddForm = (mealKey) => {
    setActiveAddMeal(mealKey);
    setSelectedPresetIndex(0);
    setQtyInput(FOOD_DICTIONARY[0].defaultQty.toString());
    setIsCustomMode(false);
    // Reset custom fields
    setCustomName('');
    setCustomUnit('g');
    setCustomCal('');
    setCustomProt('');
    setCustomCarb('');
    setCustomFat('');
    setCustomFib('');
  };

  const handlePresetSelectChange = (e) => {
    const idx = parseInt(e.target.value, 10);
    if (idx === -1) {
      setIsCustomMode(true);
      setQtyInput('1');
    } else {
      setIsCustomMode(false);
      setSelectedPresetIndex(idx);
      setQtyInput(FOOD_DICTIONARY[idx].defaultQty.toString());
    }
  };

  const handleAddFoodSubmit = (e) => {
    e.preventDefault();
    if (!activeAddMeal) return;

    let newItem = null;
    const qty = parseFloat(qtyInput) || 1;

    if (isCustomMode) {
      if (!customName.trim()) return;
      const cal = parseFloat(customCal) || 0;
      const prot = parseFloat(customProt) || 0;
      const carb = parseFloat(customCarb) || 0;
      const fat = parseFloat(customFat) || 0;
      const fib = parseFloat(customFib) || 0;

      // Custom base calculation
      newItem = {
        name: customName,
        baseCalories: cal,
        baseProtein: prot,
        baseCarbs: carb,
        baseFats: fat,
        baseFiber: fib,
        qty: qty,
        unit: customUnit
      };
    } else {
      const preset = FOOD_DICTIONARY[selectedPresetIndex];
      newItem = {
        name: preset.name,
        baseCalories: preset.baseCalories,
        baseProtein: preset.baseProtein,
        baseCarbs: preset.baseCarbs,
        baseFats: preset.baseFats,
        baseFiber: preset.baseFiber,
        qty: qty,
        unit: preset.unit
      };
    }

    const updated = { ...customMeals };
    updated[activeAddMeal].push(newItem);
    setCustomMeals(updated);
    localStorage.setItem('forge_custom_meals', JSON.stringify(updated));

    // Reset Form
    setActiveAddMeal(null);
  };

  return (
    <div className="module-detail">
      <div className="wrap">
        <h2 className="display" style={{ fontSize: '32px', marginBottom: '10px' }}>
          Plate 04 <span>/</span> Fuel
        </h2>
        <p style={{ color: 'var(--steel)', marginBottom: '40px', maxWidth: '600px' }}>
          Build your daily diet, check details, and track your calories. Enter the foods you actually consume for lunch, dinner, breakfast, or snacks to compute your daily caloric split.
        </p>

        {!hasCustomProfile && (
          <div className="warning-banner" style={{ borderLeftColor: 'var(--vital-dim)', background: 'rgba(184, 67, 31, 0.08)', marginBottom: '30px' }}>
            <strong>Default Profile Loaded</strong>
            You are viewing recommendations using standard baseline parameters (75kg, 15% Body Fat). Complete your profile details in <strong>Plate 01 / Login &amp; Profile</strong> to receive a precise, individual calibration.
          </div>
        )}

        <div className="detail-grid">
          {/* Daily Caloric Target & Tracker Panel */}
          <div className="panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 className="panel-title">Caloric <span>Tracker</span></h3>
              
              <div className="stats-display" style={{ marginBottom: '24px' }}>
                <div className="stat-box" style={{ gridColumn: 'span 2' }}>
                  <div className="lbl">Target Daily Intake</div>
                  <div className="val" style={{ color: 'var(--steel)', fontSize: '30px' }}>
                    {calorieTarget} <span style={{ fontSize: '14px' }}>kcal</span>
                  </div>
                </div>
                <div className="stat-box" style={{ gridColumn: 'span 2' }}>
                  <div className="lbl" style={{ color: 'var(--vital)' }}>Total Consumed Today</div>
                  <div className="val" style={{ color: 'var(--vital)', fontSize: '30px' }}>
                    {dailyTotals.calories} <span style={{ fontSize: '14px', color: 'var(--vital)' }}>kcal</span>
                  </div>
                </div>
                <div className="stat-box">
                  <div className="lbl">Basal BMR</div>
                  <div className="val">{bmr} <span>kcal</span></div>
                </div>
                <div className="stat-box">
                  <div className="lbl">Active TDEE</div>
                  <div className="val">{tdee} <span>kcal</span></div>
                </div>
              </div>

              {/* PROGRESS METER */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px' }}>
                  <span className="mono">Daily Limit Budget Progress</span>
                  <span className="mono" style={{ color: dailyTotals.calories > calorieTarget ? 'var(--vital)' : 'var(--sage)' }}>
                    {dailyTotals.calories} / {calorieTarget} kcal
                  </span>
                </div>
                <div style={{ background: 'var(--graphite)', height: '10px', borderRadius: '5px', overflow: 'hidden', border: '1px solid var(--line)' }}>
                  <div 
                    style={{ 
                      background: dailyTotals.calories > calorieTarget ? 'var(--vital)' : 'var(--sage)', 
                      width: `${Math.min(100, (dailyTotals.calories / calorieTarget) * 100)}%`, 
                      height: '100%', 
                      transition: 'width 0.3s ease' 
                    }} 
                  />
                </div>
                {dailyTotals.calories > calorieTarget ? (
                  <p style={{ color: 'var(--vital)', fontSize: '11px', marginTop: '6px', fontStyle: 'italic' }}>
                    // You have exceeded your target calorie budget by {dailyTotals.calories - calorieTarget} kcal.
                  </p>
                ) : (
                  <p style={{ color: 'var(--steel)', fontSize: '11px', marginTop: '6px' }}>
                    // You have {calorieTarget - dailyTotals.calories} kcal remaining for today.
                  </p>
                )}
              </div>

              {/* STEP TRACKER INPUT */}
              <div style={{ background: 'var(--graphite)', border: '1px solid var(--line)', padding: '16px', borderRadius: '2px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <label htmlFor="step-tracker" className="mono" style={{ fontSize: '11px', color: 'var(--vital)', margin: 0, textTransform: 'uppercase' }}>
                    Daily Step Tracker
                  </label>
                  <span className="mono" style={{ fontSize: '11px', color: 'var(--sage)' }}>
                    +{stepBurn} kcal burned
                  </span>
                </div>
                <input
                  type="number"
                  id="step-tracker"
                  value={stepCount}
                  onChange={handleStepsChange}
                  className="form-control"
                  style={{
                    background: 'var(--concrete)',
                    color: 'var(--chalk)',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    padding: '8px 12px',
                    border: '1px solid var(--line)'
                  }}
                  min="0"
                  max="100000"
                  placeholder="Enter steps"
                />
                <p style={{ color: 'var(--steel)', fontSize: '11.5px', marginTop: '8px', lineHeight: '1.4' }}>
                  Adjusted Total TDEE (Active + Steps): <strong style={{ color: 'var(--chalk)' }}>{adjustedTdee} kcal</strong>. Steps burn extra energy which accelerates fat loss.
                </p>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <div className="mono" style={{ fontSize: '11px', color: 'var(--steel)' }}>Active Strategy</div>
                <h4 style={{ fontSize: '18px', marginTop: '4px' }}>{goalLabel}</h4>
                <p style={{ color: 'var(--steel)', fontSize: '13px', marginTop: '2px', lineHeight: '1.5' }}>
                  Caloric targets have been offset to drive your selected goal: <strong style={{ color: 'var(--chalk)', textTransform: 'uppercase' }}>{dietGoal.replace('-', ' ')}</strong>.
                </p>
              </div>
            </div>
            
            <div style={{ borderTop: '1px solid var(--line)', paddingTop: '20px', marginTop: '10px' }}>
              <span className="mono" style={{ fontSize: '11px', color: 'var(--vital-dim)' }}>
                // BMR: 370 + 21.6 * (Weight * (1 - BF/100))
              </span>
            </div>
          </div>

          {/* Consumed Macronutrients Panel */}
          <div className="panel">
            <h3 className="panel-title">Macronutrient <span>Split</span></h3>
            <p style={{ color: 'var(--steel)', fontSize: '13px', lineHeight: '1.6' }}>
              Macronutrients distribute target calories between protein (muscle repair), carbohydrates (glycogen supply), and dietary fats (hormonal regulation).
            </p>

            {/* Visual Macro Bar Chart */}
            <div className="macro-chart">
              <div className="macro-bar protein" style={{ width: `${pPct}%` }} title={`Protein: ${pPct}%`}>
                {pPct}%
              </div>
              <div className="macro-bar carbs" style={{ width: `${cPct}%` }} title={`Carbs: ${cPct}%`}>
                {cPct}%
              </div>
              <div className="macro-bar fats" style={{ width: `${fPct}%` }} title={`Fats: ${fPct}%`}>
                {fPct}%
              </div>
            </div>

            <div className="macro-legend" style={{ marginBottom: '30px' }}>
              <div className="legend-item">
                <span className="legend-dot protein"></span> Protein
              </div>
              <div className="legend-item">
                <span className="legend-dot carbs"></span> Carbs
              </div>
              <div className="legend-item">
                <span className="legend-dot fats"></span> Fats
              </div>
            </div>

            {/* List Specs (Target vs Consumed) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Protein (4 kcal/g)</span>
                <span className="mono" style={{ color: 'var(--vital)' }}>
                  {dailyTotals.protein}g / <span style={{ color: 'var(--steel)', fontSize: '11.5px' }}>Target: {proteinTargetGrams}g</span>
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Carbohydrates (4 kcal/g)</span>
                <span className="mono" style={{ color: '#E0C183' }}>
                  {dailyTotals.carbs}g / <span style={{ color: 'var(--steel)', fontSize: '11.5px' }}>Target: {carbTargetGrams}g</span>
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Dietary Fats (9 kcal/g)</span>
                <span className="mono" style={{ color: 'var(--sage)' }}>
                  {dailyTotals.fats}g / <span style={{ color: 'var(--steel)', fontSize: '11.5px' }}>Target: {fatTargetGrams}g</span>
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Dietary Fiber (0 kcal/g)</span>
                <span className="mono" style={{ color: 'var(--sage)' }}>
                  {dailyTotals.fiber}g / <span style={{ color: 'var(--steel)', fontSize: '11.5px' }}>Target: 25g+</span>
                </span>
              </div>
            </div>

            <div style={{ marginTop: '24px', borderTop: '1px solid var(--line)', paddingTop: '20px' }}>
              <span className="mono" style={{ fontSize: '11px', color: 'var(--steel)' }}>
                // Whole food sources: Chicken Breast, Eggs, Rice, Sweet Potatoes, Avocado, Nuts.
              </span>
            </div>
          </div>
        </div>

        {/* 3. INTERACTIVE CUSTOM DIET BUILDER */}
        <div className="panel" style={{ marginTop: '40px', borderLeft: '4px solid var(--vital)' }}>
          <h3 className="panel-title">Custom <span>Diet Plan Builder</span></h3>
          <p style={{ color: 'var(--steel)', fontSize: '13.5px', marginBottom: '30px', lineHeight: '1.6' }}>
            Build your personalized diet schedule. Tell us what you eat for Breakfast, Lunch, Dinner, and Snacks. You can edit quantities or add items from our preset dictionary or enter custom items.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {mealsList.map((mealKey) => {
              const items = customMeals[mealKey];
              const totals = getMealSum(items);
              const isAdding = activeAddMeal === mealKey;

              return (
                <div 
                  key={mealKey} 
                  style={{
                    background: 'var(--concrete-2)',
                    border: '1px solid var(--line)',
                    padding: '24px',
                    borderRadius: '2px'
                  }}
                >
                  {/* Meal Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--line)', paddingBottom: '12px', marginBottom: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className="mono" style={{ fontSize: '11px', color: 'var(--vital)', textTransform: 'uppercase' }}>
                        // MEAL STRUCTURE
                      </span>
                      <h4 style={{ fontSize: '18px', textTransform: 'uppercase', margin: 0 }}>
                        {mealKey}
                      </h4>
                    </div>

                    <button
                      onClick={() => handleOpenAddForm(mealKey)}
                      className="mono btn-primary"
                      style={{
                        padding: '6px 12px',
                        fontSize: '11px',
                        cursor: 'pointer'
                      }}
                    >
                      + ADD FOOD
                    </button>
                  </div>

                  {/* Meal Items List */}
                  {items.length === 0 ? (
                    <p style={{ color: 'var(--steel)', fontSize: '13px', fontStyle: 'italic', margin: '20px 0' }}>
                      No foods logged for this meal yet. Click "+ Add Food" to build this meal.
                    </p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                      {items.map((item, idx) => {
                        const itemCal = Math.round(item.qty * item.baseCalories);
                        const itemProt = Math.round(item.qty * item.baseProtein * 10) / 10;
                        const itemCarb = Math.round(item.qty * item.baseCarbs * 10) / 10;
                        const itemFat = Math.round(item.qty * item.baseFats * 10) / 10;

                        return (
                          <div 
                            key={idx} 
                            style={{ 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              alignItems: 'center', 
                              background: 'var(--graphite)', 
                              border: '1px solid var(--line)', 
                              padding: '12px 15px', 
                              borderRadius: '2px' 
                            }}
                          >
                            <div style={{ flex: 2 }}>
                              <h5 style={{ margin: 0, fontSize: '14px', color: 'var(--chalk)' }}>{item.name}</h5>
                              <p className="mono" style={{ fontSize: '11px', color: 'var(--steel)', margin: '4px 0 0 0' }}>
                                {itemCal} kcal | P: {itemProt}g | C: {itemCarb}g | F: {itemFat}g
                              </p>
                            </div>

                            {/* Quantity Input Adjuster */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '20px' }}>
                              <input
                                type="number"
                                value={item.qty}
                                onChange={(e) => handleUpdateQty(mealKey, idx, e.target.value)}
                                className="form-control"
                                style={{
                                  width: '70px',
                                  padding: '5px 8px',
                                  fontSize: '13px',
                                  textAlign: 'center',
                                  background: 'var(--concrete)'
                                }}
                                min="0"
                                step="any"
                              />
                              <span style={{ fontSize: '12px', color: 'var(--steel)' }}>{item.unit}</span>
                            </div>

                            {/* Delete Button */}
                            <button
                              onClick={() => handleDeleteItem(mealKey, idx)}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--vital)',
                                cursor: 'pointer',
                                fontSize: '16px'
                              }}
                              title="Remove item"
                            >
                              🗑️
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Add Food Form (Inline) */}
                  {isAdding && (
                    <form 
                      onSubmit={handleAddFoodSubmit}
                      style={{
                        background: 'var(--graphite)',
                        border: '1px solid var(--vital)',
                        padding: '20px',
                        borderRadius: '2px',
                        marginTop: '15px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px'
                      }}
                    >
                      <h5 className="mono" style={{ margin: 0, fontSize: '12px', color: 'var(--vital)' }}>
                        LOG NEW FOOD TO {mealKey.toUpperCase()}
                      </h5>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        <div>
                          <label className="mono" style={{ fontSize: '10px', color: 'var(--steel)', display: 'block', marginBottom: '6px' }}>SELECT FOOD ITEM</label>
                          <select
                            onChange={handlePresetSelectChange}
                            className="form-control"
                            style={{ padding: '8px', fontSize: '13px' }}
                          >
                            {FOOD_DICTIONARY.map((food, presetIdx) => (
                              <option key={presetIdx} value={presetIdx}>
                                {food.name} ({food.unit === 'g' ? 'per 1g' : 'per 1 piece'})
                              </option>
                            ))}
                            <option value="-1">// Custom Item...</option>
                          </select>
                        </div>
                        <div>
                          <label className="mono" style={{ fontSize: '10px', color: 'var(--steel)', display: 'block', marginBottom: '6px' }}>QUANTITY</label>
                          <input
                            type="number"
                            value={qtyInput}
                            onChange={(e) => setQtyInput(e.target.value)}
                            className="form-control"
                            style={{ padding: '8px', fontSize: '13px' }}
                            required
                            min="0.1"
                            step="any"
                          />
                        </div>
                      </div>

                      {/* Custom Food Extra Fields */}
                      {isCustomMode && (
                        <div style={{ background: 'var(--concrete)', padding: '15px', border: '1px solid var(--line)', borderRadius: '2px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <h6 className="mono" style={{ margin: 0, fontSize: '11px', color: 'var(--steel)' }}>CUSTOM FOOD SPECIFICATIONS (PER UNIT)</h6>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
                            <div>
                              <label className="mono" style={{ fontSize: '9px', color: 'var(--steel)', display: 'block', marginBottom: '4px' }}>Food Name</label>
                              <input type="text" value={customName} onChange={(e) => setCustomName(e.target.value)} className="form-control" style={{ padding: '6px 8px', fontSize: '12px' }} placeholder="e.g. Ragi Dosa" required={isCustomMode} />
                            </div>
                            <div>
                              <label className="mono" style={{ fontSize: '9px', color: 'var(--steel)', display: 'block', marginBottom: '4px' }}>Unit Type</label>
                              <select value={customUnit} onChange={(e) => setCustomUnit(e.target.value)} className="form-control" style={{ padding: '6px 8px', fontSize: '12px' }}>
                                <option value="g">grams (g)</option>
                                <option value="piece(s)">pieces</option>
                              </select>
                            </div>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
                            <div>
                              <label className="mono" style={{ fontSize: '8px', color: 'var(--steel)', display: 'block', marginBottom: '4px' }}>Kcal</label>
                              <input type="number" value={customCal} onChange={(e) => setCustomCal(e.target.value)} className="form-control" style={{ padding: '6px 4px', fontSize: '12px', textAlign: 'center' }} step="any" required={isCustomMode} />
                            </div>
                            <div>
                              <label className="mono" style={{ fontSize: '8px', color: 'var(--vital)', display: 'block', marginBottom: '4px' }}>Prot (g)</label>
                              <input type="number" value={customProt} onChange={(e) => setCustomProt(e.target.value)} className="form-control" style={{ padding: '6px 4px', fontSize: '12px', textAlign: 'center' }} step="any" />
                            </div>
                            <div>
                              <label className="mono" style={{ fontSize: '8px', color: '#E0C183', display: 'block', marginBottom: '4px' }}>Carb (g)</label>
                              <input type="number" value={customCarb} onChange={(e) => setCustomCarb(e.target.value)} className="form-control" style={{ padding: '6px 4px', fontSize: '12px', textAlign: 'center' }} step="any" />
                            </div>
                            <div>
                              <label className="mono" style={{ fontSize: '8px', color: 'var(--sage)', display: 'block', marginBottom: '4px' }}>Fat (g)</label>
                              <input type="number" value={customFat} onChange={(e) => setCustomFat(e.target.value)} className="form-control" style={{ padding: '6px 4px', fontSize: '12px', textAlign: 'center' }} step="any" />
                            </div>
                            <div>
                              <label className="mono" style={{ fontSize: '8px', color: 'var(--steel)', display: 'block', marginBottom: '4px' }}>Fib (g)</label>
                              <input type="number" value={customFib} onChange={(e) => setCustomFib(e.target.value)} className="form-control" style={{ padding: '6px 4px', fontSize: '12px', textAlign: 'center' }} step="any" />
                            </div>
                          </div>
                          <small style={{ color: 'var(--steel)', fontSize: '10px' }}>
                            * Enter calories and macros **per single unit** (e.g. per 1 gram or per 1 piece).
                          </small>
                        </div>
                      )}

                      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
                        <button
                          type="button"
                          onClick={() => setActiveAddMeal(null)}
                          className="mono"
                          style={{
                            background: 'transparent',
                            border: '1px solid var(--line)',
                            color: 'var(--steel)',
                            padding: '8px 16px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          CANCEL
                        </button>
                        <button
                          type="submit"
                          className="mono btn-primary"
                          style={{
                            padding: '8px 16px',
                            fontSize: '12px'
                          }}
                        >
                          ADD FOOD ITEM
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Meal Subtotal Footer */}
                  <div style={{ marginTop: '15px', borderTop: '1px solid var(--line)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                    <span className="mono" style={{ fontSize: '12px', color: 'var(--steel)' }}>
                      Meal Subtotal:
                    </span>
                    <span className="mono" style={{ fontSize: '12px', color: 'var(--chalk)', fontWeight: 'bold' }}>
                      {totals.calories} kcal | P: {totals.protein}g | C: {totals.carbs}g | F: {totals.fats}g | Fiber: {totals.fiber}g
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. PRESET INDIAN WHOLE FOOD REFERENCE DATABASE */}
        <div className="panel" style={{ marginTop: '40px' }}>
          <h3 className="panel-title">Preset Food <span>Reference Directory</span></h3>
          <p style={{ color: 'var(--steel)', fontSize: '13.5px', marginBottom: '25px', lineHeight: '1.6' }}>
            Portion-to-macro index containing pre-calibrated foods. Type these values in the "Custom Item" selector if you are eating non-standard amounts.
          </p>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--vital)', color: 'var(--chalk)', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
                  <th style={{ padding: '12px 8px' }}>FOOD ITEM</th>
                  <th style={{ padding: '12px 8px' }}>PORTION</th>
                  <th style={{ padding: '12px 8px' }}>CALORIES</th>
                  <th style={{ padding: '12px 8px', color: 'var(--vital)' }}>PROTEIN</th>
                  <th style={{ padding: '12px 8px', color: '#E0C183' }}>CARBS</th>
                  <th style={{ padding: '12px 8px', color: 'var(--sage)' }}>FATS</th>
                  <th style={{ padding: '12px 8px' }}>FIBER</th>
                </tr>
              </thead>
              <tbody>
                {FOOD_DICTIONARY.map((food, i) => {
                  let qtyStr = food.unit === 'g' ? '100g' : `1 ${food.unit.replace('(s)', '')}`;
                  let scalar = food.unit === 'g' ? 100 : 1;
                  return (
                    <tr key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: 'bold' }}>{food.name}</td>
                      <td style={{ padding: '12px 8px', color: 'var(--steel)' }}>{qtyStr}</td>
                      <td style={{ padding: '12px 8px' }}>{Math.round(food.baseCalories * scalar)} kcal</td>
                      <td style={{ padding: '12px 8px' }}>{Math.round(food.baseProtein * scalar * 10) / 10} g</td>
                      <td style={{ padding: '12px 8px' }}>{Math.round(food.baseCarbs * scalar * 10) / 10} g</td>
                      <td style={{ padding: '12px 8px' }}>{Math.round(food.baseFats * scalar * 10) / 10} g</td>
                      <td style={{ padding: '12px 8px' }}>{Math.round(food.baseFiber * scalar * 10) / 10} g</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
