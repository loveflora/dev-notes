import { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

type GoalInputProps = {
  onAddGoal: (enteredGoalText: string) => void; // addGoalHandler 함수 타입 정의
  dynamicStyles: {
    textColor: {
      fontSize: number;
      color: string;
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
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.textInput, props.dynamicStyles.textColor]}
        placeholder="Your course goal!"
        onChangeText={goalInputHandler}
        value={enteredGoalText}
      />
      <Button title="Add Goal" onPress={addGoalHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 24,
  },
  textInput: {
    width: "70%",
    borderWidth: 1,
    padding: 8,
    marginRight: 8,
    borderColor: "#ccc",
  },
});
