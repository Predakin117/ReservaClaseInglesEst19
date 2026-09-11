import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import Card from "../components/Card";
import { CLASES } from "../data/clases";
import { colors } from "../theme";

export default function ClasesScreen() {
  const [busqueda, setBusqueda] = useState("");

  const clasesFiltradas = CLASES.filter(
    (c) =>
      c.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.nivel.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <View style={styles.contenedor}>
      <Text style={styles.encabezado}>
        Aplicación de reserva para clases de Inglés
      </Text>
      <View style={styles.buscador}>
        <Ionicons name="search" size={18} color={colors.fondo} />
        <TextInput
          style={styles.input}
          value={busqueda}
          onChangeText={setBusqueda}
          placeholder="Ingrese el nombre o nivel para la búsqueda"
          autoCorrect={false}
          autoCapitalize="none"
        />
        {busqueda.length > 0 && (
          <Ionicons
            name="close-circle"
            size={18}
            color={colors.fondo}
            onPress={() => setBusqueda("")}
          />
        )}
      </View>
      <FlatList
        data={clasesFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Card clases={item} onPress={() => {}} />}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: "#fff" },
  encabezado: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 50,
    marginBottom: 12,
  },
  buscador: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 42,
  },
  input: { flex: 1, marginLeft: 8 },
});
