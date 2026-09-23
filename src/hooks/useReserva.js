
export default function useReserva() {
  const contexto = useContexto(ReservaContexto);
  if (!contexto) {
    throw new Error("useReserva debe usarse dentro de <ReservaProvider>");
  }
  return contexto;
}
