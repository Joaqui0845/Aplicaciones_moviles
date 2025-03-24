import { useState } from 'react';
import { Link } from 'react-router-dom';
import "../App.css";

interface Recipe {
  id: number;
  title: string;
  image: string;
  ingredients: string[];
  preparation: string[];
  emoji: string;
}

const recetasFit: Recipe[] = [
  {
    id: 1,
    title: "Panqueques de Avena y Plátano",
    image: "/Pancakes.avif",
    emoji: "🍌🥞",
    ingredients: [
      "1 plátano maduro",
      "1/2 taza de avena",
      "1 huevo",
      "1/2 taza de leche (puede ser vegetal)",
      "1 cdita de canela",
      "1 cdita de esencia de vainilla",
      "1 cdita de polvo de hornear"
    ],
    preparation: [
      "Tritura el plátano y mezcla con los demás ingredientes hasta obtener una masa homogénea.",
      "Cocina en una sartén antiadherente con un poco de aceite en spray.",
      "Cocina 2-3 minutos por lado y sirve con miel o frutos rojos."
    ]
  },
  {
    id: 2,
    title: "Ensalada de Pollo y Quinoa",
    image: "/Ensalada de pollo.avif",
    emoji: "🥗🍗",
    ingredients: [
      "1 taza de quinoa cocida",
      "100 g de pechuga de pollo a la plancha",
      "1/2 aguacate",
      "1 tomate picado",
      "1/2 pepino en rodajas",
      "Jugo de limón y aceite de oliva"
    ],
    preparation: [
      "Cocina la quinoa según las instrucciones del paquete.",
      "Corta el pollo en tiras y agrégalo a la quinoa con los demás ingredientes.",
      "Aliña con jugo de limón y aceite de oliva."
    ]
  },
  {
    id: 3,
    title: "Batido Proteico de Chocolate",
    image: "/Batido de chocolate.avif",
    emoji: "🍫🥜",
    ingredients: [
      "1 taza de leche de almendras",
      "1 scoop de proteína de chocolate",
      "1 cda de mantequilla de almendra",
      "1/2 plátano",
      "1 cdita de cacao en polvo"
    ],
    preparation: [
      "Licúa todos los ingredientes hasta obtener una textura cremosa.",
      "Sirve frío y disfruta."
    ]
  },
  {
    id: 4,
    title: "Pasta Integral con Vegetales",
    image: "/Pastas con vegetales.avif", // Asegúrate de guardar la imagen descargada con este nombre
    emoji: "🍝🥦",
    ingredients: [
      "200g de pasta integral",
      "1 calabacín mediano",
      "1 pimiento rojo",
      "10 tomates cherry",
      "2 dientes de ajo",
      "2 cdas de aceite de oliva",
      "Albahaca fresca",
      "Queso parmesano rallado (opcional)",
      "Sal y pimienta al gusto"
    ],
    preparation: [
      "Cocina la pasta integral según las instrucciones del paquete. Reserva 1/2 taza del agua de cocción.",
      "Corta el calabacín y el pimiento en trozos pequeños y parte los tomates cherry por la mitad.",
      "En una sartén grande, sofríe los dientes de ajo picados con aceite de oliva a fuego medio.",
      "Añade el calabacín y el pimiento, y cocina por unos 5 minutos hasta que estén tiernos.",
      "Agrega los tomates cherry y cocina por 2 minutos más.",
      "Incorpora la pasta cocida y un poco del agua reservada para crear una salsa ligera.",
      "Sazona con sal, pimienta y hojas de albahaca fresca picadas.",
      "Sirve inmediatamente y espolvorea con queso parmesano rallado si lo deseas."
    ]
  }
];

const Recetas = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const RecipeCard = ({ recipe }: { recipe: Recipe }) => (
    <div 
      onClick={() => setSelectedRecipe(recipe)}
      className="recipe-card"
      style={{
        backgroundColor: '#2a2a2a',
        borderRadius: '15px',
        padding: '15px',
        margin: '10px',
        cursor: 'pointer',
        transition: 'transform 0.2s'
      }}
    >
      <img 
        src={recipe.image} 
        alt={recipe.title}
        onError={(e) => {
          e.currentTarget.src = "/logo.png"; // Imagen de respaldo si hay error
          e.currentTarget.onerror = null; // Prevenir bucles infinitos
        }}
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
          borderRadius: '10px'
        }}
      />
      <h3 style={{ marginTop: '10px' }}>{recipe.title} {recipe.emoji}</h3>
    </div>
  );

  const RecipeDetail = ({ recipe }: { recipe: Recipe }) => (
    <div style={{ padding: '20px' }}>
      <button 
        onClick={() => setSelectedRecipe(null)}
        style={{
          backgroundColor: '#4CAF50',
          border: 'none',
          borderRadius: '5px',
          padding: '8px 15px',
          color: 'white',
          marginBottom: '20px',
          cursor: 'pointer'
        }}
      >
        ← Volver
      </button>
      <h2>{recipe.title} {recipe.emoji}</h2>
      <img 
        src={recipe.image} 
        alt={recipe.title}
        onError={(e) => {
          e.currentTarget.src = "/logo.png"; // Imagen de respaldo si hay error
          e.currentTarget.onerror = null; // Prevenir bucles infinitos
        }}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '15px',
          marginBottom: '20px'
        }}
      />
      
      <div style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '15px', marginBottom: '20px' }}>
        <h3>✅ Ingredientes:</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} style={{ marginBottom: '8px' }}>• {ingredient}</li>
          ))}
        </ul>
      </div>

      <div style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '15px' }}>
        <h3>🔹 Preparación:</h3>
        <ol style={{ paddingLeft: '20px' }}>
          {recipe.preparation.map((step, index) => (
            <li key={index} style={{ marginBottom: '8px' }}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );

  return (
    <div style={{ 
      backgroundColor: '#1a1a1a', 
      color: 'white', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: '70px'
    }}>
      <div style={{ flex: 1, padding: '15px', marginTop: '60px' }}>
        {!selectedRecipe ? (
          <>
            <h2 style={{ marginBottom: '20px' }}>Recetas Fit</h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: '15px'
            }}>
              {recetasFit.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </>
        ) : (
          <RecipeDetail recipe={selectedRecipe} />
        )}
      </div>

      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#1a1a1a',
        borderTop: '1px solid #333',
        padding: '10px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
        <Link to="/home" style={{ color: 'white', textDecoration: 'none', fontSize: '24px' }}>🏠</Link>
        <Link to="/search" style={{ color: 'white', textDecoration: 'none', fontSize: '24px' }}>🔍</Link>
        <Link to="/recetas" style={{ color: '#4CAF50', textDecoration: 'none', fontSize: '24px' }}>👨‍🍳</Link>
        <Link to="/progress" style={{ color: 'white', textDecoration: 'none', fontSize: '24px' }}>📈</Link>
      </nav>
    </div>
  );
};

export default Recetas;