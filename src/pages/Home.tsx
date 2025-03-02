import { useState } from "react";
import CaloriesProgress from "../components/CaloriesProgress";
import NutrientProgress from "../components/NutrientProgress"; 
import Navbar from "../components/Navbar";
import "../App.css";

// Definir tipos
type MealType = "desayuno" | "almuerzo" | "cena";

type FoodEntry = {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

const Home = () => {
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);
  const [food, setFood] = useState<Record<MealType, FoodEntry[]>>({
    desayuno: [],
    almuerzo: [],
    cena: [],
  });
  const [activities, setActivities] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú lateral

  const handleAddFood = (meal: MealType) => {
    const newFood = prompt(`Añadir comida para ${meal}:`);
    const newCalories = Number(prompt("¿Cuántas calorías tiene?"));
    const newProtein = Number(prompt("¿Cuántas proteínas tiene? (g)"));
    const newCarbs = Number(prompt("¿Cuántos carbohidratos tiene? (g)"));
    const newFat = Number(prompt("¿Cuántas grasas tiene? (g)"));

    if (newFood && !isNaN(newCalories) && !isNaN(newProtein) && !isNaN(newCarbs) && !isNaN(newFat)) {
      setFood((prev) => ({
        ...prev,
        [meal]: [...prev[meal], { name: newFood, calories: newCalories, protein: newProtein, carbs: newCarbs, fat: newFat }],
      }));
      setCalories((prev) => prev + newCalories);
      setProtein((prev) => prev + newProtein);
      setCarbs((prev) => prev + newCarbs);
      setFat((prev) => prev + newFat);
    }
  };

  const handleAddActivity = () => {
    const newActivity = prompt("Añadir actividad física:");
    if (newActivity) {
      setActivities((prev) => [...prev, newActivity]);
    }
  };

  return (
    <div className="home-container">
      {/* Barra de navegación */}
      <header className="navbar">
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        <h2>Improve Yourself</h2>
        <img src="profile.png" alt="Perfil" className="profile-icon" />
      </header>

      {/* Menú lateral */}
      <nav className={`side-menu ${menuOpen ? "open" : ""}`}>
        <ul>
          <li><a href="#">Bajar de peso</a></li>
          <li><a href="#">Mantener condición</a></li>
          <li><a href="#">Aumentar masa muscular</a></li>
        </ul>
      </nav>

      {/* Calendario */}
      <div className="calendar">
        <span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span>
      </div>

      {/* Círculo de progreso de calorías */}
      <div style={{ display: "flex", justifyContent: "left" }}>
        <CaloriesProgress currentCalories={calories} dailyGoal={2000} />
      </div>

      {/* Barras de progreso de macronutrientes */}
      <div style={{ padding: "30px" }}>
        <NutrientProgress label="Proteínas" current={protein} goal={150} color="white" />
        <NutrientProgress label="Carbohidratos" current={carbs} goal={300} color="white" />
        <NutrientProgress label="Grasas" current={fat} goal={80} color="white" />
      </div>

      {/* Sección de alimentos */}
      <div className="food-section">
        <h3>Alimentos</h3>
        {(["desayuno", "almuerzo", "cena"] as MealType[]).map((meal) => (
          <div key={meal}>
            <p>{meal.charAt(0).toUpperCase() + meal.slice(1)}</p>
            <button onClick={() => handleAddFood(meal)}>➕</button>
            <ul>
              {food[meal].map((item, index) => (
                <li key={index}>
                  {item.name} - {item.calories} kcal, {item.protein}g proteínas, {item.carbs}g carbos, {item.fat}g grasas
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Sección de actividad física */}
      <div className="activity-section">
        <h3>Actividad física</h3>
        <button onClick={handleAddActivity}>➕</button>
        <ul>
          {activities.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
      </div>

      {/* Barra de navegación */}
      <Navbar />
    </div>
  );
};

export default Home;
