import React from 'react';

interface MacroProgressProps {
  protein: number;
  carbs: number;
  fats: number;
  proteinGoal: number;
  carbsGoal: number;
  fatsGoal: number;
}

const MacroProgress: React.FC<MacroProgressProps> = ({
  protein,
  carbs,
  fats,
  proteinGoal,
  carbsGoal,
  fatsGoal
}) => {
  const calculatePercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  return (
    <div className="macro-progress" style={{ padding: '20px' }}>
      {/* Proteína */}
      <div style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span style={{ color: '#fff' }}>Proteína</span>
          <span style={{ color: '#888' }}>{protein}g / {proteinGoal}g</span>
        </div>
        <div style={{ 
          width: '100%', 
          height: '8px', 
          backgroundColor: '#333',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${calculatePercentage(protein, proteinGoal)}%`,
            height: '100%',
            backgroundColor: '#FF4B4B',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Carbohidratos */}
      <div style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span style={{ color: '#fff' }}>Carbohidratos</span>
          <span style={{ color: '#888' }}>{carbs}g / {carbsGoal}g</span>
        </div>
        <div style={{ 
          width: '100%', 
          height: '8px', 
          backgroundColor: '#333',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${calculatePercentage(carbs, carbsGoal)}%`,
            height: '100%',
            backgroundColor: '#FFB84B',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Grasas */}
      <div style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span style={{ color: '#fff' }}>Grasas</span>
          <span style={{ color: '#888' }}>{fats}g / {fatsGoal}g</span>
        </div>
        <div style={{ 
          width: '100%', 
          height: '8px', 
          backgroundColor: '#333',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${calculatePercentage(fats, fatsGoal)}%`,
            height: '100%',
            backgroundColor: '#4BFF4B',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>
    </div>
  );
};

export default MacroProgress;
