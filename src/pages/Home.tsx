import { useState } from "react";
import Navbar from "../components/Navbar";
import CaloriesProgress from "../components/CaloriesProgress";
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

  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const currentDay = 1; 

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
    // Valores aproximados de calorías quemadas por minuto para diferentes actividades
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
    const activityName = prompt("¿Qué actividad física realizaste?");
    if (!activityName) return;

    const durationStr = prompt("¿Cuántos minutos duraste?");
    if (!durationStr) return;

    const duration = parseInt(durationStr);
    if (isNaN(duration) || duration <= 0) {
      alert("Por favor ingresa una duración válida en minutos");
      return;
    }

    const caloriesBurned = calculateCaloriesBurned(activityName, duration);
    
    const newActivity: Activity = {
      name: activityName,
      duration: duration,
      caloriesBurned: caloriesBurned
    };

    setActivities(prev => [...prev, newActivity]);
    setTotalCaloriesBurned(prev => prev + caloriesBurned);
    setCalories(prev => prev - caloriesBurned); // Restar calorías quemadas del total
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
        {/* Campos de entrada */}
        <div className="nutrient-inputs" style={{ marginBottom: '20px', padding: '20px' }}>
          <input
            type="text"
            placeholder="Proteína"
            value={personalInfo.proteina}
            onChange={(e) => handleInputChange('proteina', e.target.value)}
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
            type="text"
            placeholder="Carbohidratos"
            value={personalInfo.carbohidratos}
            onChange={(e) => handleInputChange('carbohidratos', e.target.value)}
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
            type="text"
            placeholder="Grasas"
            value={personalInfo.grasas}
            onChange={(e) => handleInputChange('grasas', e.target.value)}
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
        </div>

        {/* Círculo de progreso de calorías */}
        <div className="calories-progress">
          <CaloriesProgress currentCalories={calories} dailyGoal={2500} />
        </div>

        {/* Días de la semana */}
        <div className="week-tracker" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '30px',
          padding: '0 20px'
        }}>
          {days.map((day, index) => (
            <div
              key={day}
              className={`day-circle ${index === currentDay ? 'active' : ''}`}
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: index === currentDay ? '#4CAF50' : '#333',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px'
              }}
            >
              {day}
            </div>
          ))}
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
        <section className="activity-section" style={{ padding: '0 20px' }}>
          <h3 style={{ marginBottom: '15px' }}>Actividad física</h3>
          <button 
            onClick={handleAddActivity}
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              marginBottom: '15px',
              cursor: 'pointer'
            }}
          >
            Agregar Actividad
          </button>
          
          <div className="activities-list" style={{ marginBottom: '20px' }}>
            {activities.map((activity, index) => (
              <div 
                key={index} 
                style={{
                  backgroundColor: '#2a2a2a',
                  padding: '10px',
                  borderRadius: '5px',
                  marginBottom: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <strong>{activity.name}</strong>
                  <span style={{ marginLeft: '10px', color: '#888' }}>
                    {activity.duration} minutos
                  </span>
                </div>
                <div style={{ color: '#4CAF50' }}>
                  -{activity.caloriesBurned} kcal
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ 
            backgroundColor: '#2a2a2a', 
            padding: '15px', 
            borderRadius: '5px',
            textAlign: 'center' 
          }}>
            <h4 style={{ marginBottom: '10px' }}>Total Calorías Quemadas</h4>
            <div style={{ 
              fontSize: '24px',
              color: '#4CAF50'
            }}>
              {totalCaloriesBurned} kcal
            </div>
          </div>
        </section>
      </main>

      <Navbar />
    </div>
  );
};

export default Home;
