import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import ImagePicker from "../../components/Places/ImagePicker";
import LocationPicker from "../../components/Places/LocationPicker";

export default function PlaceForm() {
  const [enteredTitle, setEnteredTitle] = useState("");
  function changeTitleHandler() {
    setEnteredTitle(enteredTitle);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker />
      <LocationPicker />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
