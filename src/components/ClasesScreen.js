import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text } from "react-native";
import { colors } from "../theme/Index.js";

export default function ClasesScreen({ navigation }) {
  const [clases, setClases] = useState("Todos");
  const [busqueda, setBusqueda] = useState();

  return (
    <view>
      <Text> Aplicación de reserva para clases de Ingles </Text>
      <view>
        <Ionicons name="search" size={18} color={colors.primario} />
        <TextInput
          value={busqueda}
          onChangeText={setBusqueda}
          placeholder="Ingrese el nombre o nivel para la busqueda"
          autoCorrect={false}
          autoComplete={false}
        />
        {busqueda.leng > 0 && (
          <Ionicons
            name="clse-circle"
            size={18}
            color={colors.primario}
            onPress={() => setBusqueda("")}
          />
        )}
      </view>
    </view>
  );
}
