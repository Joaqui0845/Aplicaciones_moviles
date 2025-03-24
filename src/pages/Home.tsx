import { useState } from 'react';
import Navbar from "../components/Navbar";
import CaloriesProgress from "../components/CaloriesProgress";
import MacroProgress from "../components/MacroProgress";
import ProfileMenu from '../components/ProfileMenu';
import "../App.css";

interface FoodItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
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

interface FoodState {
  desayuno: FoodItem[];
  almuerzo: FoodItem[];
  cena: FoodItem[];
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

  // Función para manejar cambios en los inputs del IMC
  const handleImcChange = (field: keyof ImcData, value: string) => {
    setImcData({
      ...imcData,
      [field]: value
    });
  };

  // Función para calcular el IMC
  const calculateIMC = () => {
    if (imcData.peso && imcData.altura && parseFloat(imcData.peso) > 0 && parseFloat(imcData.altura) > 0) {
      // Convertir altura de cm a metros
      const alturaEnMetros = parseFloat(imcData.altura) / 100;
      // Calcular IMC: peso(kg) / (altura(m))²
      const imc = (parseFloat(imcData.peso) / (alturaEnMetros * alturaEnMetros)).toFixed(1);
      return imc;
    }
    return "0.0";
  };

  // Función para obtener la categoría de IMC y recomendación
  const getImcCategory = () => {
    const imc = parseFloat(calculateIMC());
    
    if (imc < 18.5) {
      return {
        category: "Peso insuficiente",
        recommendation: "Considera aumentar la ingesta calórica y consulta con un profesional de la salud para evaluar tu nutrición."
      };
    } else if (imc >= 18.5 && imc < 25) {
      return {
        category: "Peso saludable",
        recommendation: "¡Mantén el buen trabajo! Continúa con una dieta equilibrada y actividad física regular."
      };
    } else if (imc >= 25 && imc < 30) {
      return {
        category: "Sobrepeso",
        recommendation: "Considera incorporar más actividad física y revisar tu alimentación para reducir gradualmente tu peso."
      };
    } else {
      return {
        category: "Obesidad",
        recommendation: "Es recomendable que consultes con un profesional de la salud para desarrollar un plan personalizado de pérdida de peso."
      };
    }
  };

  // Función para obtener el color según la categoría de IMC
  const getImcCategoryColor = () => {
    const imc = parseFloat(calculateIMC());
    
    if (imc < 18.5) {
      return "#E67E22"; // Naranja para peso insuficiente
    } else if (imc >= 18.5 && imc < 25) {
      return "#27AE60"; // Verde para peso saludable
    } else if (imc >= 25 && imc < 30) {
      return "#F39C12"; // Ámbar para sobrepeso
    } else {
      return "#C0392B"; // Rojo para obesidad
    }
  };

  const handleAddFood = (meal: keyof FoodState) => {
    const newFood = prompt(`Añadir comida para ${meal}:`);
    const newCalories = Number(prompt("¿Cuántas calorías tiene?"));

    if (newFood && !isNaN(newCalories)) {
      setFood(prev => ({
        ...prev,
        [meal]: [...prev[meal], { name: newFood, calories: newCalories, protein: 0, carbs: 0, fats: 0 }]
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
    if (!activityName || !activityDuration) return;
    
    const duration = parseInt(activityDuration);
    if (isNaN(duration) || duration <= 0) return;
    
    const caloriesBurned = calculateCaloriesBurned(activityName, duration);
    
    const newActivity: Activity = {
      name: activityName,
      duration: duration,
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
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          flex: 1,
          overflow: 'hidden'
        }}>
          <h2 style={{ fontSize: 'clamp(1rem, 5vw, 1.5rem)', whiteSpace: 'nowrap' }}>Improve Yourself</h2>
          <img src="/logo.png" alt="Logo" className="logo" style={{ marginLeft: '10px', maxHeight: '30px' }} />
        </div>
        <ProfileMenu />
      </header>

      {/* Menú lateral */}
      <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <h3>Menú</h3>
          <button className="close-btn" onClick={() => setMenuOpen(false)}>×</button>
        </div>
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
            {imcData.peso && imcData.altura && parseFloat(imcData.peso) > 0 && parseFloat(imcData.altura) > 0 && (
              <div className="imc-category" style={{
                marginTop: '10px',
                padding: '10px',
                borderRadius: '5px',
                backgroundColor: getImcCategoryColor(),
                color: 'white'
              }}>
                <p><strong>{getImcCategory().category}</strong></p>
                <p style={{ fontSize: '14px', marginTop: '5px' }}>{getImcCategory().recommendation}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <main className="main-content" style={{ padding: '0 10px' }}>
        {/* Días de la semana */}
        <div className="week-tracker" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 'clamp(5px, 2vw, 15px)',
          marginBottom: '20px',
          padding: '10px 0',
          overflowX: 'auto',
          width: '100%'
        }}>
          {days.map((day, index) => (
            <div
              key={day}
              className={`day-circle ${index === selectedDay ? 'active' : ''}`}
              style={{
                width: 'clamp(30px, 8vw, 35px)',
                height: 'clamp(30px, 8vw, 35px)',
                borderRadius: '50%',
                backgroundColor: index === selectedDay ? '#4CAF50' : '#333',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'clamp(12px, 3vw, 14px)',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                flexShrink: 0
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
          gap: '20px',
          marginBottom: '20px'
        }}>
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            gap: '30px',
            width: '100%'
          }}>
            <div className="calories-progress" style={{ maxWidth: '100%' }}>
              <CaloriesProgress currentCalories={calories} dailyGoal={2500} />
            </div>
            <div style={{ width: '100%', maxWidth: '300px' }}>
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
            gap: '10px',
            backgroundColor: '#2a2a2a',
            padding: '15px',
            borderRadius: '10px',
            width: '100%',
            maxWidth: '400px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Proteínas</label>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px' }}>
                <input
                  type="number"
                  value={personalInfo.proteina}
                  onChange={(e) => handleInputChange('proteina', e.target.value)}
                  style={{
                    width: '100%',
                    maxWidth: '60px',
                    padding: '4px',
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
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Carbos</label>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px' }}>
                <input
                  type="number"
                  value={personalInfo.carbohidratos}
                  onChange={(e) => handleInputChange('carbohidratos', e.target.value)}
                  style={{
                    width: '100%',
                    maxWidth: '60px',
                    padding: '4px',
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
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Grasas</label>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px' }}>
                <input
                  type="number"
                  value={personalInfo.grasas}
                  onChange={(e) => handleInputChange('grasas', e.target.value)}
                  style={{
                    width: '100%',
                    maxWidth: '60px',
                    padding: '4px',
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
        <section className="meals-section" style={{ marginBottom: '20px', padding: '0 5px' }}>
          <h3 style={{ marginBottom: '15px' }}>Alimentos</h3>
          <div className="meal-group" style={{ marginBottom: '15px' }}>
            <div className="meal-header" style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h4 style={{ margin: '0' }}>Desayuno</h4>
              <button 
                onClick={() => handleAddFood('desayuno')} 
                className="add-food"
                style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >+</button>
            </div>
            {food.desayuno.map((item, index) => (
              <div 
                key={index} 
                className="food-item"
                style={{
                  backgroundColor: '#333',
                  padding: '8px 10px',
                  borderRadius: '5px',
                  marginTop: '8px',
                  fontSize: '14px'
                }}
              >
                {item.name} - {item.calories} kcal
              </div>
            ))}
            {food.desayuno.length === 0 && (
              <div style={{ 
                backgroundColor: '#333', 
                padding: '8px 10px', 
                borderRadius: '5px', 
                marginTop: '8px', 
                textAlign: 'center',
                color: '#aaa',
                fontSize: '14px'
              }}>
                No hay alimentos para mostrar
              </div>
            )}
          </div>
          
          <div className="meal-group" style={{ marginBottom: '15px' }}>
            <div className="meal-header" style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h4 style={{ margin: '0' }}>Almuerzo</h4>
              <button 
                onClick={() => handleAddFood('almuerzo')} 
                className="add-food"
                style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >+</button>
            </div>
            {food.almuerzo.map((item, index) => (
              <div 
                key={index} 
                className="food-item"
                style={{
                  backgroundColor: '#333',
                  padding: '8px 10px',
                  borderRadius: '5px',
                  marginTop: '8px',
                  fontSize: '14px'
                }}
              >
                {item.name} - {item.calories} kcal
              </div>
            ))}
            {food.almuerzo.length === 0 && (
              <div style={{ 
                backgroundColor: '#333', 
                padding: '8px 10px', 
                borderRadius: '5px', 
                marginTop: '8px', 
                textAlign: 'center',
                color: '#aaa',
                fontSize: '14px'
              }}>
                No hay alimentos para mostrar
              </div>
            )}
          </div>
          
          <div className="meal-group" style={{ marginBottom: '15px' }}>
            <div className="meal-header" style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h4 style={{ margin: '0' }}>Cena</h4>
              <button 
                onClick={() => handleAddFood('cena')} 
                className="add-food"
                style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >+</button>
            </div>
            {food.cena.map((item, index) => (
              <div 
                key={index} 
                className="food-item"
                style={{
                  backgroundColor: '#333',
                  padding: '8px 10px',
                  borderRadius: '5px',
                  marginTop: '8px',
                  fontSize: '14px'
                }}
              >
                {item.name} - {item.calories} kcal
              </div>
            ))}
            {food.cena.length === 0 && (
              <div style={{ 
                backgroundColor: '#333', 
                padding: '8px 10px', 
                borderRadius: '5px', 
                marginTop: '8px', 
                textAlign: 'center',
                color: '#aaa',
                fontSize: '14px'
              }}>
                No hay alimentos para mostrar
              </div>
            )}
          </div>
        </section>

        {/* Actividad física */}
        <div style={{ 
          backgroundColor: '#2a2a2a', 
          borderRadius: '10px', 
          padding: '15px',
          margin: '20px auto',
          width: '100%'
        }}>
          <h3 style={{ marginBottom: '15px' }}>Actividad Física</h3>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: '10px',
            marginBottom: '15px' 
          }}>
            <input
              type="text"
              placeholder="Nombre de la actividad"
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
              style={{ 
                width: '100%',
                padding: '8px',
                borderRadius: '5px',
                backgroundColor: '#333',
                border: 'none',
                color: 'white'
              }}
            />
            <div style={{
              display: 'flex',
              gap: '10px'
            }}>
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
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                Agregar
              </button>
            </div>
          </div>

          {/* Lista de actividades */}
          <div style={{ marginBottom: '15px' }}>
            {activities.map((activity, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px',
                  backgroundColor: '#333',
                  borderRadius: '5px',
                  marginBottom: '8px',
                  fontSize: '14px'
                }}
              >
                <span>{activity.name}</span>
                <span>{activity.duration} min - {activity.caloriesBurned} cal</span>
              </div>
            ))}
            {activities.length === 0 && (
              <div style={{ 
                backgroundColor: '#333', 
                padding: '10px', 
                borderRadius: '5px', 
                textAlign: 'center',
                color: '#aaa',
                fontSize: '14px'
              }}>
                No hay actividades registradas
              </div>
            )}
          </div>

          {/* Total de calorías quemadas */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            borderTop: '1px solid #444',
            paddingTop: '10px',
            fontSize: '14px'
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