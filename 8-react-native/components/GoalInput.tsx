import { useState } from "react";
import { Button, Modal, StyleSheet, View, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";

type GoalInputProps = {
  visible: boolean;
  modalHandler: () => void;
  onAddGoal: (enteredGoalText: string) => void; // addGoalHandler 함수 타입 정의
};

export default function GoalInput(props: GoalInputProps) {
  const [enteredGoalText, setEnteredGoalText] = useState("");

  function goalInputHandler(eneteredText: string) {
    setEnteredGoalText(eneteredText);
  }

  function addGoalHandler() {
    props.onAddGoal(enteredGoalText);
    setEnteredGoalText("");
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/goal.png")}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal!"
          placeholderTextColor="#888"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Add Goal" onPress={addGoalHandler} color="#ab6aff" />
          </View>
          <View style={styles.button}>
            <Button
              title="Cancel"
              onPress={props.modalHandler}
              color="#f31282"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#311b6b",
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    padding: 16,
    borderColor: "#e4d0ff",
    backgroundColor: "#e4d0ff",
    color: "#380404",
    borderRadius: 6,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
  },
  button: {
    width: "40%",
    marginHorizontal: 8,
  },
});
