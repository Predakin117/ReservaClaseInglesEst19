export const NIVELES = ["A1", "A2", "B1", "B2", "C1"];

export const CLASES = [
  {
    id: "1",
    titulo: "Inglés Conversacional",
    nivel: "B1",
    profesor: { nombre: "Prof. Laura Gómez" },
    precio: 45000,
    imagen: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  },
  {
    id: "2",
    titulo: "Gramática Básica",
    nivel: "A1",
    profesor: { nombre: "Prof. Carlos Ruiz" },
    precio: 30000,
    imagen: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
  },
  {
    id: "3",
    titulo: "Inglés de Negocios",
    nivel: "C1",
    profesor: { nombre: "Prof. Ana Torres" },
    precio: 60000,
    imagen: "https://images.unsplash.com/photo-1552664730-d307ca884978",
  },
];

export function formatearPrecio(precio) {
  return precio.toLocaleString("es-CO", { style: "currency", currency: "COP" });
}
