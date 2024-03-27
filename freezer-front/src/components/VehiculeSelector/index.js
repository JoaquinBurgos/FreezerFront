import React from 'react';
import { Select, Tag } from 'antd';

const { Option } = Select;

// Datos hardcodeados de ejemplo
const camiones = [
  { id: 159171, nombre: 'RSHJ48', capacidad: 3000 },
  { id: 357890, nombre: 'RWWZ12', capacidad: 2500 },
  { id: 159172, nombre: 'SGTR83', capacidad: 3000 },
  { id: 158941, nombre: 'SVBZ78', capacidad: 4000 },
  // Agrega más camiones según sea necesario
];

const SeleccionCamiones = ({ onCamionesSelected, vehiculosConfirmados, selectedVehicles }) => {
  // Encuentra los camiones seleccionados basados en los IDs en selectedVehicles
  const selectedVehiclesInfo = camiones.filter(camion => selectedVehicles.includes(camion.id));

  return (
    <div>
      {vehiculosConfirmados ? (
        // Si los vehículos están confirmados, muestra los camiones seleccionados como tags o en el formato que prefieras
        <div>
          {selectedVehiclesInfo.map(camion => (
            <Tag key={camion.id}>{camion.nombre} - {camion.capacidad} Kg</Tag>
          ))}
        </div>
      ) : (
        // De lo contrario, muestra el Select para permitir la selección
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Selecciona camiones"
          onChange={onCamionesSelected} // Función para manejar la selección
          value={selectedVehicles} // Asegura que el Select refleje los IDs seleccionados
        >
          {camiones.map(camion => (
            <Option key={camion.id} value={camion.id}>
              {camion.nombre} - {camion.capacidad} Kg
            </Option>
          ))}
        </Select>
      )}
    </div>
  );
};

export default SeleccionCamiones;
