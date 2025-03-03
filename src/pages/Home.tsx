import { useState } from "react";
import Navbar from "../components/Navbar";
import CaloriesProgress from "../components/CaloriesProgress";
import MacroProgress from "../components/MacroProgress";
import "../App.css";

interface FoodItem {
  name: string;
  calories: number;
}

interface FoodState {
  desayuno: FoodItem[];
  almuerzo: FoodItem[];
  cena: FoodItem[];
}

interface PersonalInfo {
  proteina: string;
  carbohidratos: string;
  grasas: string;
}

interface ImcData {
  peso: string;
  altura: string;
}

interface Activity {
  name: string;
  duration: number;
  caloriesBurned: number;
}

const Home = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    proteina: "",
    carbohidratos: "",
    grasas: "",
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);
  const [imcData, setImcData] = useState<ImcData>({
    peso: "",
    altura: "",
  });

  const [calories, setCalories] = useState(0);
  const [food, setFood] = useState<FoodState>({
    desayuno: [],
    almuerzo: [],
    cena: [],
  });

  const [activities, setActivities] = useState<Activity[]>([]);
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState(0);

  const [activityName, setActivityName] = useState('');
  const [activityDuration, setActivityDuration] = useState('');

  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  

  const handleInputChange = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImcChange = (field: keyof ImcData, value: string) => {
    setImcData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateIMC = () => {
    const peso = parseFloat(imcData.peso);
    const altura = parseFloat(imcData.altura) / 100; // convertir cm a metros
    if (peso && altura) {
      return (peso / (altura * altura)).toFixed(2);
    }
    return "---";
  };

  const handleAddFood = (meal: keyof FoodState) => {
    const newFood = prompt(`Añadir comida para ${meal}:`);
    const newCalories = Number(prompt("¿Cuántas calorías tiene?"));

    if (newFood && !isNaN(newCalories)) {
      setFood(prev => ({
        ...prev,
        [meal]: [...prev[meal], { name: newFood, calories: newCalories }]
      }));
      setCalories(prev => prev + newCalories);
    }
  };

  // Función para calcular calorías quemadas basado en la actividad y duración
  const calculateCaloriesBurned = (activity: string, duration: number): number => {

    const caloriesPerMinute: { [key: string]: number } = {
      'caminar': 4,
      'correr': 10,
      'ciclismo': 7,
      'natación': 9,
      'yoga': 3,
      'pesas': 5,
      'otro': 5
    };

    const normalizedActivity = activity.toLowerCase();
    const burnRate = caloriesPerMinute[normalizedActivity] || caloriesPerMinute['otro'];
    return Math.round(burnRate * duration);
  };

  const handleAddActivity = () => {
    const caloriesBurned = calculateCaloriesBurned(activityName, parseInt(activityDuration));
    
    const newActivity: Activity = {
      name: activityName,
      duration: parseInt(activityDuration),
      caloriesBurned: caloriesBurned
    };

    setActivities(prev => [...prev, newActivity]);
    setTotalCaloriesBurned(prev => prev + caloriesBurned);
    setCalories(prev => prev - caloriesBurned); // Restar calorías quemadas del total
    setActivityName('');
    setActivityDuration('');
  };

  const handleDayClick = (index: number) => {
    setSelectedDay(index);
    // Aquí puedes cargar los datos específicos del día seleccionado
  };

  return (
    <div className="app-container" style={{ backgroundColor: '#1a1a1a', color: 'white', minHeight: '100vh' }}>
      {/* Barra de navegación */}
      <header className="navbar">
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        <div className="header-content">
          <h2>Improve Yourself</h2>
          <img src="/logo.png" alt="Logo" className="logo" />
        </div>
        <img src="/Profile.png" alt="Perfil" className="profile-icon" />
      </header>

      {/* Menú lateral */}
      <nav className={`side-menu ${menuOpen ? "open" : ""}`}>
        <button className="close-menu" onClick={() => setMenuOpen(false)}>×</button>
        <h3 style={{ marginBottom: '15px', padding: '10px' }}>Calculadora IMC</h3>
        <div className="imc-calculator" style={{ padding: '15px' }}>
          <input
            type="number"
            placeholder="Peso (kg)"
            value={imcData.peso}
            onChange={(e) => handleImcChange('peso', e.target.value)}
            style={{
              backgroundColor: '#333',
              border: 'none',
              padding: '10px',
              marginBottom: '10px',
              width: '100%',
              color: 'white',
              borderRadius: '5px'
            }}
          />
          <input
            type="number"
            placeholder="Altura (cm)"
            value={imcData.altura}
            onChange={(e) => handleImcChange('altura', e.target.value)}
            style={{
              backgroundColor: '#333',
              border: 'none',
              padding: '10px',
              marginBottom: '10px',
              width: '100%',
              color: 'white',
              borderRadius: '5px'
            }}
          />
          <div className="imc-result" style={{ 
            backgroundColor: '#333', 
            padding: '10px', 
            borderRadius: '5px',
            textAlign: 'center',
            marginTop: '10px'
          }}>
            <p>Tu IMC: {calculateIMC()}</p>
          </div>
        </div>
      </nav>

      <main className="main-content">
        {/* Días de la semana */}
        <div className="week-tracker" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '15px',
          marginBottom: '40px',
          padding: '20px 0'
        }}>
          {days.map((day, index) => (
            <div
              key={day}
              className={`day-circle ${index === selectedDay ? 'active' : ''}`}
              style={{
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                backgroundColor: index === selectedDay ? '#4CAF50' : '#333',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}
              onClick={() => handleDayClick(index)}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Círculo de calorías y barras de progreso */}
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '40px',
          marginBottom: '40px'
        }}>
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '60px'
          }}>
            <div className="calories-progress">
              <CaloriesProgress currentCalories={calories} dailyGoal={2500} />
            </div>
            <div style={{ width: '300px' }}>
              <MacroProgress
                protein={parseInt(personalInfo.proteina) || 0}
                carbs={parseInt(personalInfo.carbohidratos) || 0}
                fats={parseInt(personalInfo.grasas) || 0}
                proteinGoal={150}
                carbsGoal={300}
                fatsGoal={70}
              />
            </div>
          </div>

          {/* Inputs de macronutrientes */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '20px',
            backgroundColor: '#2a2a2a',
            padding: '20px',
            borderRadius: '10px',
            width: 'fit-content'
          }}>
            <div style={{ textAlign: 'center' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Proteínas</label>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <input
                  type="number"
                  value={personalInfo.proteina}
                  onChange={(e) => handleInputChange('proteina', e.target.value)}
                  style={{
                    width: '60px',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    backgroundColor: '#333',
                    border: 'none',
                    color: 'white',
                    fontSize: '14px',
                    textAlign: 'center'
                  }}
                />
                <span style={{ fontSize: '14px' }}>g</span>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Carbohidratos</label>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <input
                  type="number"
                  value={personalInfo.carbohidratos}
                  onChange={(e) => handleInputChange('carbohidratos', e.target.value)}
                  style={{
                    width: '60px',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    backgroundColor: '#333',
                    border: 'none',
                    color: 'white',
                    fontSize: '14px',
                    textAlign: 'center'
                  }}
                />
                <span style={{ fontSize: '14px' }}>g</span>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Grasas</label>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <input
                  type="number"
                  value={personalInfo.grasas}
                  onChange={(e) => handleInputChange('grasas', e.target.value)}
                  style={{
                    width: '60px',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    backgroundColor: '#333',
                    border: 'none',
                    color: 'white',
                    fontSize: '14px',
                    textAlign: 'center'
                  }}
                />
                <span style={{ fontSize: '14px' }}>g</span>
              </div>
            </div>
          </div>
        </div>

        {/* Secciones de comidas */}
        <section className="meals-section" style={{ marginBottom: '20px', padding: '0 20px' }}>
          <h3 style={{ marginBottom: '15px' }}>Alimentos</h3>
          <div className="meal-group" style={{ marginBottom: '15px' }}>
            <div className="meal-header">
              <h4 style={{ marginBottom: '10px' }}>Desayuno</h4>
              <button onClick={() => handleAddFood('desayuno')} className="add-food">+</button>
            </div>
            {food.desayuno.map((item, index) => (
              <div key={index} className="food-item">
                {item.name} - {item.calories} kcal
              </div>
            ))}
          </div>
          <div className="meal-group" style={{ marginBottom: '15px' }}>
            <div className="meal-header">
              <h4 style={{ marginBottom: '10px' }}>Almuerzo</h4>
              <button onClick={() => handleAddFood('almuerzo')} className="add-food">+</button>
            </div>
            {food.almuerzo.map((item, index) => (
              <div key={index} className="food-item">
                {item.name} - {item.calories} kcal
              </div>
            ))}
          </div>
          <div className="meal-group" style={{ marginBottom: '15px' }}>
            <div className="meal-header">
              <h4 style={{ marginBottom: '10px' }}>Cena</h4>
              <button onClick={() => handleAddFood('cena')} className="add-food">+</button>
            </div>
            {food.cena.map((item, index) => (
              <div key={index} className="food-item">
                {item.name} - {item.calories} kcal
              </div>
            ))}
          </div>
        </section>

        {/* Actividad física */}
        <div style={{ 
          backgroundColor: '#2a2a2a', 
          borderRadius: '10px', 
          padding: '20px',
          margin: '20px auto',
          maxWidth: '800px'
        }}>
          <h3>Actividad Física</h3>
          <div style={{ 
            display: 'flex', 
            gap: '20px',
            marginBottom: '20px' 
          }}>
            <input
              type="text"
              placeholder="Nombre de la actividad"
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
              style={{ 
                flex: '2',
                padding: '8px',
                borderRadius: '5px',
                backgroundColor: '#333',
                border: 'none',
                color: 'white'
              }}
            />
            <input
              type="number"
              placeholder="Duración (minutos)"
              value={activityDuration}
              onChange={(e) => setActivityDuration(e.target.value)}
              style={{ 
                flex: '1',
                padding: '8px',
                borderRadius: '5px',
                backgroundColor: '#333',
                border: 'none',
                color: 'white'
              }}
            />
            <button
              onClick={handleAddActivity}
              style={{
                padding: '8px 16px',
                backgroundColor: '#4CAF50',
                border: 'none',
                borderRadius: '5px',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Agregar
            </button>
          </div>

          {/* Lista de actividades */}
          <div style={{ marginBottom: '20px' }}>
            {activities.map((activity, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px',
                  backgroundColor: '#333',
                  borderRadius: '5px',
                  marginBottom: '10px'
                }}
              >
                <span>{activity.name}</span>
                <span>{activity.duration} min - {activity.caloriesBurned} cal</span>
              </div>
            ))}
          </div>

          {/* Total de calorías quemadas */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            borderTop: '1px solid #444',
            paddingTop: '15px'
          }}>
            <span>Total calorías quemadas: {totalCaloriesBurned}</span>
          </div>
        </div>
      </main>

      <Navbar />
    </div>
  );
};

export default Home;
