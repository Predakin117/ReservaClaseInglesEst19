import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useCallback, useEffect, useState } from "react";

const CLAVE_RESERVAS = "@reservas_mj20";

export const ReservaContext = createContext();

export function ReservaProvider({ children }) {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Cargar al iniciar
  useEffect(() => {
    const cargar = async () => {
      try {
        const guardando = await AsyncStorage.getItem(CLAVE_RESERVAS);
        if (guardando !== null) {
          setReservas(JSON.parse(guardando));
        }
      } catch (error) {
        console.log("Error al cargar la informacion", error);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  // Guardar cada vez que cambie el arreglo de reservas
  useEffect(() => {
    if (cargando) return;
    AsyncStorage.setItem(CLAVE_RESERVAS, JSON.stringify(reservas)).catch(
      (error) => console.log("Error guardando reservas: ", error),
    );
  }, [reservas, cargando]);

  const agregarReserva = useCallback((clase, horario) => {
    const nueva = {
      id: clase.id + "-" + horario,
      titulo: clase.titulo,
      nivel: clase.nivel,
      profesor: clase.profesor.nombre + "-" + clase.profesor.apellido,
      precio: clase.precio,
      horario,
      creadoEn: new Date().toISOString(),
    };

    let resultado = { ok: true };

    setReservas((prev) => {
      if (prev.some((r) => r.id === nueva.id)) {
        resultado = { ok: false };
        return prev;
      }
      return [nueva, ...prev];
    });

    return resultado;
  }, []);

  return (
    <ReservaContext.Provider value={{ reservas, agregarReserva, cargando }}>
      {children}
    </ReservaContext.Provider>
  );
}
