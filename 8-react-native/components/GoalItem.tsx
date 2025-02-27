import { StyleSheet, Text, View, Pressable } from "react-native";

type GoalItemProps = {
  text: string;
  onDeleteItem: () => void;
};

export default function GoalItem(props: GoalItemProps) {
  return (
    //* Pressable: 클릭 가능
    <Pressable onPress={props.onDeleteItem}>
      <View style={styles.goalItem}>
        <Text style={styles.goalText}>{props.text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  goalText: {
    color: "white",
  },
});
