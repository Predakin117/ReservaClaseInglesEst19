import { Stack } from "expo-router";

import DetalleClaseScreen from "@/screens/DetalleClaseScreen";

export default function DetalleClase() {
  return (
    <>
      <Stack.Screen options={{ title: "Detalle", headerShown: true }} />
      <DetalleClaseScreen />
    </>
  );
}
