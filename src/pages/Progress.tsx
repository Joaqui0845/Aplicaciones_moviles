import React, { useState, useRef, useEffect } from 'react';
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

interface Photo {
  url: string;
  date: string;
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
  
  // Función para cargar todos los datos desde localStorage
  const loadUserData = () => {
    try {
      // Cargar fotos
      const savedPhotosString = localStorage.getItem('userPhotos');
      let savedPhotos: Photo[] = [];
      
      if (savedPhotosString) {
        savedPhotos = JSON.parse(savedPhotosString);
        console.log("Fotos cargadas desde localStorage:", savedPhotos.length);
      }
      
      // Cargar otros datos del usuario
      const savedWeight = localStorage.getItem('userWeight') || '';
      const savedBodyFat = localStorage.getItem('userBodyFat') || '';
      const savedGoal = localStorage.getItem('userGoal') as UserData['goal'] || null;
      
      // Actualizar el estado
      setUserData(prev => ({
        ...prev,
        weight: savedWeight,
        bodyFat: savedBodyFat,
        goal: savedGoal,
        photos: savedPhotos
      }));
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
  };

  // Cargar datos al iniciar el componente
  useEffect(() => {
    loadUserData();
  }, []);

  // Función para guardar los datos de usuario en localStorage
  const saveUserData = (data: Partial<UserData>) => {
    try {
      // Solo guardar lo que ha cambiado
      if ('photos' in data && data.photos) {
        localStorage.setItem('userPhotos', JSON.stringify(data.photos));
        console.log("Guardando fotos en localStorage:", data.photos.length);
      }
      
      if ('weight' in data && data.weight !== undefined) {
        localStorage.setItem('userWeight', data.weight);
      }
      
      if ('bodyFat' in data && data.bodyFat !== undefined) {
        localStorage.setItem('userBodyFat', data.bodyFat);
      }
      
      if ('goal' in data && data.goal) {
        localStorage.setItem('userGoal', data.goal);
      }
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  };

  // Función para manejar la carga de fotos y optimizarlas
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Función para comprimir la imagen antes de guardarla
    const compressAndSaveImage = (file: File) => {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        // Crear un elemento de imagen para manipular el tamaño
        const img = new Image();
        img.onload = () => {
          // Crear un canvas para redimensionar la imagen
          const canvas = document.createElement('canvas');
          // Reducir tamaño para ahorrar espacio en localStorage
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          
          let width = img.width;
          let height = img.height;
          
          // Calcular nuevas dimensiones manteniendo proporción
          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round(height * (MAX_WIDTH / width));
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round(width * (MAX_HEIGHT / height));
              height = MAX_HEIGHT;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // Dibujar imagen redimensionada
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Convertir a URL con calidad reducida
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
          
          // Crear nueva foto
          const newPhoto = {
            url: compressedDataUrl,
            date: new Date().toLocaleDateString()
          };
          
          // Actualizar estado con la nueva foto
          const updatedPhotos = [...userData.photos, newPhoto];
          
          setUserData(prev => {
            const newState = {
              ...prev,
              photos: updatedPhotos
            };
            return newState;
          });
          
          // Guardar el estado actualizado en localStorage
          saveUserData({ photos: updatedPhotos });
        };
        
        // Cargar la imagen desde el resultado del FileReader
        img.src = reader.result as string;
      };
      
      reader.readAsDataURL(file);
    };
    
    // Procesar la imagen
    compressAndSaveImage(file);
  };

  // Manejar cambios en peso y grasa
  const handleWeightChange = (value: string) => {
    setUserData(prev => {
      const newState = { ...prev, weight: value };
      saveUserData({ weight: value });
      return newState;
    });
  };

  const handleBodyFatChange = (value: string) => {
    setUserData(prev => {
      const newState = { ...prev, bodyFat: value };
      saveUserData({ bodyFat: value });
      return newState;
    });
  };

  // Manejar cambio de objetivo
  const handleGoalChange = (goal: UserData['goal']) => {
    setUserData(prev => {
      const newState = { ...prev, goal };
      saveUserData({ goal });
      return newState;
    });
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
            onClick={() => handleGoalChange(option.id as UserData['goal'])}
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
    const [selectedMonth, setSelectedMonth] = useState<string>(new Date().toLocaleString('default', { month: 'long' }));
    const [monthlyCalories, setMonthlyCalories] = useState<{ [key: string]: string }>({});
  
    // Cargar datos guardados en localStorage al iniciar
    useEffect(() => {
      const savedCalories = localStorage.getItem('monthlyCalories');
      if (savedCalories) {
        setMonthlyCalories(JSON.parse(savedCalories));
      }
    }, []);
  
    // Guardar en localStorage cuando cambian las calorías
    useEffect(() => {
      localStorage.setItem('monthlyCalories', JSON.stringify(monthlyCalories));
    }, [monthlyCalories]);
  
    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedMonth(e.target.value);
    };
  
    const handleCalorieChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setMonthlyCalories({
        ...monthlyCalories,
        [selectedMonth]: e.target.value,
      });
    };
  
    return (
      <div className="progress-section">
        <h3>Establece tu objetivo de calorías mensual</h3>
        
        <label>Selecciona un mes:</label>
        <select value={selectedMonth} onChange={handleMonthChange} className="month-select">
          {[
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
          ].map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
  
        <label>Calorías objetivo para {selectedMonth}:</label>
        <input 
          type="number" 
          value={monthlyCalories[selectedMonth] || ''} 
          onChange={handleCalorieChange} 
          className="calorie-input"
          placeholder="Ingrese calorías"
        />
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
            onChange={(e) => handleWeightChange(e.target.value)}
            placeholder="Ej: 70.5"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>% de grasa corporal</label>
          <input
            type="number"
            value={userData.bodyFat}
            onChange={(e) => handleBodyFatChange(e.target.value)}
            placeholder="Ej: 15"
            className="form-input"
          />
        </div>
      </div>
    </div>
  );

  // Botón para depuración - úsalo sólo si necesitas comprobar qué hay en localStorage
  const DebugButton = () => (
    <button 
      onClick={() => {
        console.log("Current photos in state:", userData.photos);
        console.log("Photos in localStorage:", JSON.parse(localStorage.getItem('userPhotos') || '[]'));
      }}
      style={{ marginBottom: '10px', padding: '5px 10px' }}
    >
      Debug Storage
    </button>
  );

  return (
    <div className="page-container">
      <div className="content-container">
        <h2>Mi físico</h2>
        {/* Comentar esta línea cuando no necesites depurar */}
        <DebugButton />
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