import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { formatearPrecio } from "../data/clases";
import { colors } from "../theme";
import EtiquetaNivel from "./EtiquetaNivel";

export default function Card({ clase, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.contenedor, pressed && styles.presionado]}
    >
      <Image source={{ uri: clase.imagen }} style={styles.imagen} />
      <View style={styles.info}>
        <EtiquetaNivel nivel={clase.nivel} />
        <Text style={styles.titulo}>{clase.titulo}</Text>
        <Text>{clase.nivel}</Text>
        <Text>{clase.profesor?.nombre}</Text>
        <Text>{formatearPrecio(clase.precio)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: colors.superficie,
  },
  imagen: {
    width: "100%",
    height: 140,
  },
  info: {
    padding: 12,
  },
  titulo: {
    fontSize: 16,
    color: colors.texto,
    fontWeight: "700",
    marginTop: 6,
  },
});
