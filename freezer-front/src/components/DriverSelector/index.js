import { Select, Tag } from "antd";

// Datos hardcodeados de ejemplo
const conductores = [
  { id: 219031, nombre: "Luisaguilera123" },
  { id: 328779, nombre: "Hector Constanzo" },
  { id: 111086, nombre: "Wladimir1" },
  { id: 77534, nombre: "javiera pinilla" },
  { id: 278569, nombre: "onasis" },
  // Agrega más conductores según sea necesario
];

const { Option } = Select;

const SeleccionConductores = ({ onConductoresSelected, driversConfirmados,  selectedDrivers}) => {
  const selectedDriversInfo = conductores.filter(driver => selectedDrivers.includes(driver.id));

  return (
    <div>
      {driversConfirmados ? (
        // Si los vehículos están confirmados, muestra los camiones seleccionados como tags o en el formato que prefieras
        <div>
          {selectedDriversInfo.map((driver) => (
            <Tag key={driver.id}>
              {driver.nombre}
            </Tag>
          ))}
        </div>
      ) : (
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Selecciona conductores"
          onChange={onConductoresSelected} // Función para manejar la selección
        >
          {conductores.map((conductor) => (
            <Option key={conductor.id} value={conductor.id}>
              {conductor.nombre}
            </Option>
          ))}
        </Select>
      )}
    </div>
  );
};
export default SeleccionConductores;
