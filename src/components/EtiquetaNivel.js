import { StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../theme";

export default function EtiquetaNivel({ nivel }) {
  return (
    <View style={[styles.contenedor, { backgroundColor: colors.fondo }]}>
      <Text style={styles.texto}>{nivel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    alignSelf: "flex-start",
    paddingVertical: 3,
    paddingHorizontal: spacing.sm,
    borderRadius: 8,
  },
  texto: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.3,
    color: "#fff",
  },
});
