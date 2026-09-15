import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ClasesStack from "./src/navigation/ClasesStack";
import { colors } from "./src/theme";

const temaNavegation = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.fondo,
    card: colors.superficie,
    primary: colors.primario,
    text: colors.texto,
    border: colors.borde,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={temaNavegation}>
        <StatusBar style="dark" />
        <ClasesStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
