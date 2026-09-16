import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import {
    Alert,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import EtiquetaNivel from "../components/EtiquetaNivel";
import { CLASES, formatearPrecio } from "../data/clases";
import { colors, radius, spacing, typography } from "../theme";

export default function DetalleClaseScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const clase = CLASES.find((item) => item.id === id);

  if (!clase) {
    return (
      <View
        style={[
          styles.pantalla,
          {
            paddingTop: insets.top + spacing.lg,
            paddingHorizontal: spacing.lg,
          },
        ]}
      >
        <Text style={{ color: colors.texto }}>
          No se encontró información de la clase.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.pantalla}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Image
          source={{ uri: clase.imagen }}
          resizeMode="cover"
          style={[styles.portada, { height: 220 }]}
        />

        <View style={{ padding: spacing.lg, gap: spacing.lg }}>
          <View>
            <EtiquetaNivel nivel={clase.nivel} />
            <Text style={typography.titulo}>{clase.titulo}</Text>
          </View>

          {/* Foto del profesor al lado su nombre con apellido */}
          <View style={styles.profesor}>
            <Image
              source={{ uri: clase.profesor?.foto }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.profesorNombre}>
                {clase.profesor?.nombre}
              </Text>
              <Text style={{ color: colors.textoSuave, fontSize: 13 }}>
                {clase.profesor?.pais}
              </Text>
            </View>
          </View>

          <View style={styles.datos}>
            {/* precio */}
            <View style={styles.dato}>
              <Text style={styles.datoValor}>
                {formatearPrecio(clase.precio)}
              </Text>
              <Text style={{ color: colors.textoSuave, fontSize: 12 }}>
                Precio
              </Text>
            </View>
            {/* duracion */}
            <View style={styles.dato}>
              <Text style={styles.datoValor}>{clase.duracion} min</Text>
              <Text style={{ color: colors.textoSuave, fontSize: 12 }}>
                Duración
              </Text>
            </View>
            {/* cupos */}
            <View style={styles.dato}>
              <Text style={styles.datoValor}>{clase.cupos}</Text>
              <Text style={{ color: colors.textoSuave, fontSize: 12 }}>
                Cupos
              </Text>
            </View>
          </View>

          <Text style={styles.descripcion}>{clase.descripcion}</Text>

          {/* horarios */}
          <View>
            <Text
              style={{
                ...typography.texto,
                fontWeight: "700",
                marginBottom: spacing.sm,
              }}
            >
              Horarios disponibles
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: spacing.sm,
              }}
            >
              {clase.horarios?.map((horario) => (
                <View key={horario} style={styles.horarioChip}>
                  <Text style={styles.horarioTexto}>{horario}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* boton de reservar clase */}
      <View
        style={[
          styles.barra,
          {
            paddingHorizontal: spacing.lg,
            paddingBottom: insets.bottom + spacing.md,
          },
        ]}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.textoSuave, fontSize: 12 }}>Precio</Text>
          <Text style={styles.precio}>{formatearPrecio(clase.precio)}</Text>
        </View>
        <Pressable
          style={styles.botonReservar}
          onPress={() =>
            Alert.alert("Clase reservada", `Reservaste "${clase.titulo}"`)
          }
        >
          <Ionicons name="calendar" size={18} color="#fff" />
          <Text style={styles.botonReservarTexto}>Reservar clase</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  portada: { width: "100%", backgroundColor: colors.primarioSuave },
  datos: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
  },
  dato: { alignItems: "center", gap: 2 },
  datoValor: { fontSize: 16, fontWeight: "800", color: colors.texto },
  profesor: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.borde,
  },
  profesorNombre: { fontSize: 15, fontWeight: "700", color: colors.texto },
  descripcion: {
    ...typography.cuerpo,
    color: colors.textoSuave,
    lineHeight: 22,
    marginTop: spacing.sm,
  },
  barra: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.superficie,
    borderTopWidth: 1,
    borderTopColor: colors.borde,
    paddingVertical: spacing.lg,
    paddingTop: spacing.lg,
  },
  precio: { fontSize: 18, fontWeight: "800", color: colors.primario },
  horarioChip: {
    borderWidth: 1,
    borderColor: colors.borde,
    borderRadius: radius.full,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.superficie,
  },
  horarioTexto: { fontSize: 13, color: colors.texto, fontWeight: "600" },
  botonReservar: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: colors.primario,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  botonReservarTexto: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
