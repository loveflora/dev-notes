import { View } from "react-native-web";
import { Image, Pressable, Text } from "react-native/types";

export default function PlaceItem({ place, onSelect }) {
  return (
    <Pressable onPress={onSelect}>
      <Image source={{ uri: place.imageUri }} />
      <View>
        <Text>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
