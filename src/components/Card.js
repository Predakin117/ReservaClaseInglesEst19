import { Image, Pressable } from "react-native";
import EtiquetaNivel from "../EtiquetaNivel";

export default function Card({ clases, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <Image source={{ uri: clases.imagen }} />
      <view>
        <EtiquetaNivel nivel={clases.nivel} />
        <Text style={styles.titulo}> {clases.titulo} </Text>
        <Text> {clases.nivel} </Text>
        <Text> {clases.profesor.nombre} </Text>
        <Text> {formatearPrecio(clases.precio)} </Text>
      </view>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  titulo: { fontSize: 16, color: colors.texto },
});
