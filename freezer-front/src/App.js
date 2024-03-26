import React from 'react';
import './App.css';
import AppRouter from './routes'; // Asegúrate de que la ruta de importación sea correcta

function App() {
  return (
    <div className="App">
      <AppRouter /> {/* Esto renderizará tus rutas */}
    </div>
  );
}

export default App;