import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { formatearPrecio } from "../data/clases";
import { colors } from "../theme";
import EtiquetaNivel from "./EtiquetaNivel";

export default function Card({ clase, clases, onPress }) {
  const item = clase || clases;
  if (!item) return null;

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Image source={{ uri: item.imagen }} style={styles.imagen} />
      <View style={styles.info}>
        <EtiquetaNivel nivel={item.nivel} />
        <Text style={styles.titulo}>{item.titulo}</Text>
        <Text>{item.nivel}</Text>
        <Text>{item.profesor?.nombre}</Text>
        <Text>{formatearPrecio(item.precio)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
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
