import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import "../App.css";

interface UserData {
  weight: string;
  bodyFat: string;
  goal: 'lose' | 'maintain' | 'gain' | null;
  calories: number[];
  photos: Array<{
    url: string;
    date: string;
  }>;
}

const Progress = () => {
  const [userData, setUserData] = useState<UserData>({
    weight: '',
    bodyFat: '',
    goal: null,
    calories: [2000, 1800, 2200, 1900, 2100, 2300, 2000],
    photos: []
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPhoto = {
          url: reader.result as string,
          date: new Date().toLocaleDateString()
        };
        setUserData(prev => ({
          ...prev,
          photos: [...prev.photos, newPhoto]
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const PhotoSection = () => (
    <div className="progress-section">
      <h3>Mi Progreso Físico</h3>
      <div className="photo-grid">
        <button 
          className="add-photo-button"
          onClick={() => fileInputRef.current?.click()}
        >
          +
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handlePhotoUpload}
          accept="image/*"
          style={{ display: 'none' }}
        />
        {userData.photos.map((photo, index) => (
          <div key={index} className="photo-item">
            <img src={photo.url} alt={`Progress ${photo.date}`} />
            <span className="photo-date">{photo.date}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const GoalSelector = () => (
    <div className="progress-section">
      <h3>Objetivo</h3>
      <div className="goal-buttons">
        {[
          { id: 'lose', text: 'Bajar de peso', emoji: '⬇️' },
          { id: 'maintain', text: 'Mantener mi estado', emoji: '⚖️' },
          { id: 'gain', text: 'Aumentar masa muscular', emoji: '💪' }
        ].map(option => (
          <button
            key={option.id}
            onClick={() => setUserData({ ...userData, goal: option.id as UserData['goal'] })}
            className={`goal-button ${userData.goal === option.id ? 'active' : ''}`}
          >
            <span>{option.emoji}</span>
            <span>{option.text}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const CaloriesChart = () => {
    const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    
    return (
      <div className="progress-section">
        <h3>Calorías</h3>
        <div className="calories-chart">
          {userData.calories.map((cal, index) => (
            <div
              key={index}
              className="calories-bar"
              style={{
                height: `${(cal / 3000) * 100}%`
              }}
            >
              <span className="day-label">{weekDays[index]}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const WeightAndFatForm = () => (
    <div className="progress-section">
      <h3>Peso y % de grasa</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>Peso actual (kg)</label>
          <input
            type="number"
            value={userData.weight}
            onChange={(e) => setUserData({ ...userData, weight: e.target.value })}
            placeholder="Ej: 70.5"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>% de grasa corporal</label>
          <input
            type="number"
            value={userData.bodyFat}
            onChange={(e) => setUserData({ ...userData, bodyFat: e.target.value })}
            placeholder="Ej: 15"
            className="form-input"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="page-container">
      <div className="content-container">
        <h2>Mi físico</h2>
        <PhotoSection />
        <GoalSelector />
        <CaloriesChart />
        <WeightAndFatForm />
      </div>

      <nav className="bottom-nav">
        <Link to="/home">🏠</Link>
        <Link to="/search">🔍</Link>
        <Link to="/recetas">👨‍🍳</Link>
        <Link to="/progress" className="active">📈</Link>
      </nav>
    </div>
  );
};

export default Progress;
