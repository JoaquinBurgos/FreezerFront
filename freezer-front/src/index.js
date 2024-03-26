import React from 'react';
import { createRoot } from 'react-dom/client'; // Importa createRoot de react-dom/client
import './index.css';
import App from './App'; // Verifica que esta importación sea correcta
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Asegúrate de que PersistGate esté importado correctamente
import { store, persistor } from './store'; // Asegúrate de que store y persistor estén importados correctamente

// Accede al contenedor del DOM donde tu aplicación será montada
const container = document.getElementById('root');

// Verifica que el elemento contenedor exista antes de llamar a createRoot
if (container) {
  // Crea una raíz con createRoot
  const root = createRoot(container);

  // Usa el método .render para montar tu componente App envuelto en los proveedores necesarios
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
}
