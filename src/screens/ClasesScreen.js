import { useMemo, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Card from "../components/Card";
import EstadoVacio from "../components/EstadoVacio";
import NivelChip from "../components/NivelChip";
import useResponsive from "../hooks/useResponsive";

import { CLASES, NIVELES } from "../data/clases";
import { colors, radius, spacing } from "../theme";

export default function ClasesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { columnas, paddingHorizontal } = useResponsive();

  const [nivel, setNivel] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  const resultados = useMemo(() => {
    const textoBusqueda = (busqueda || "").trim().toLowerCase();
    return CLASES.filter((clase) => {
      const coincideNivel = nivel === "Todos" || clase.nivel === nivel;
      const coincideTexto =
        textoBusqueda === "" ||
        clase.profesor?.nombre?.toLowerCase().includes(textoBusqueda) ||
        clase.titulo?.toLowerCase().includes(textoBusqueda);
      return coincideNivel && coincideTexto;
    });
  }, [nivel, busqueda]);

  return (
    <View
      style={[style.pantalla, { paddingTop: insets.top + spacing.md }]}
    >
      <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.md }}>
        <Text style={style.titulo}>Aplicación de reserva para clases de inglés</Text>
        <View style={style.buscador}>
          <Ionicons name="search" size={18} color={colors.primario} />
          <TextInput
            value={busqueda}
            onChangeText={setBusqueda}
            placeholder="Ingrese el nombre o nivel para la búsqueda"
            placeholderTextColor={colors.textoSuave}
            autoCorrect={false}
            autoCapitalize="none"
            style={style.input}
          />
          {Boolean(busqueda && busqueda.length > 0) && (
            <Ionicons
              name="close-circle"
              size={18}
              color={colors.primario}
              onPress={() => setBusqueda("")}
            />
          )}
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.md }}
        style={{ flexGrow: 0 }}
      >
        {NIVELES.map((item) => (
          <NivelChip
            key={item}
            etiqueta={item}
            activo={nivel === item}
            onPress={() => setNivel(item)}
          />
        ))}
      </ScrollView>
      <FlatList
        key={columnas}
        data={resultados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            clase={item}
            onPress={() => router.push({ pathname: "/detalle-clase", params: { id: item.id } })}
          />
        )}
        contentContainerStyle={{
          paddingHorizontal,
          flexGrow: 1,
        }}
        numColumns={columnas}
        ListEmptyComponent={
          <EstadoVacio
            icono="search-outline"
            titulo="No se encontraron resultados"
            mensaje="Prueba con otra combinación de palabras para la búsqueda"
            onAction={() => {
              setNivel("Todos");
              setBusqueda("");
            }}
          />
        }
      />
    </View>
  );
}

const style = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  titulo: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.texto,
    marginBottom: spacing.xs,
  },
  buscador: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.superficie,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    height: 46,
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borde,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.texto,
    paddingVertical: 0,
  },
});
