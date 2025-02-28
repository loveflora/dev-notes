import { StyleSheet, Text, View, Pressable } from "react-native";

type GoalItemProps = {
  text: string;
  id: string;
  onDeleteItem: (id: string) => void;
};

export default function GoalItem(props: GoalItemProps) {
  return (
    <View style={styles.goalItem}>
      {/* Pressable: 클릭 가능 */}
      <Pressable
        android_ripple={{ color: "#210644" }}
        // onPress={() => props.onDeleteItem(props.id)}
        onPress={props.onDeleteItem.bind(null, props.id)}
        style={({ pressed }) => pressed && styles.pressedItem}
      >
        <Text style={styles.goalText}>{props.text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  goalText: {
    color: "white",
    padding: 8,
  },
  pressedItem: {
    opacity: 0.5,
  },
});
