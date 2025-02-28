import { useState } from "react";
import { Button, Modal, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

type GoalInputProps = {
  visible: boolean;
  modalHandler: () => void;
  onAddGoal: (enteredGoalText: string) => void; // addGoalHandler 함수 타입 정의
  dynamicStyles: {
    textColor: {
      fontSize: number;
      color: string;
      backgroundColor: string;
    };
  };
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
      <View style={[styles.inputContainer, props.dynamicStyles.textColor]}>
        <TextInput
          style={[styles.textInput, props.dynamicStyles.textColor]}
          placeholder="Your course goal!"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Add Goal" onPress={addGoalHandler} />
          </View>
          <View style={styles.button}>
            <Button title="Cancel" onPress={props.modalHandler} />
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
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 24,
    padding: 16,
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    padding: 8,
    borderColor: "#ccc",
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
