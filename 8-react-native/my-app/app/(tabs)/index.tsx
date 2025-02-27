import { Image, StyleSheet, Platform, View, Text, Button } from "react-native";
//-- react-native
// DOM 요소를 가지고 있지 않아서, HTML 요소 지원하지 않음

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TextInput } from "react-native-gesture-handler";

import { useColorScheme } from "@/hooks/useColorScheme";
import { useState } from "react";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const dynamicStyles = StyleSheet.create({
    description: {
      fontSize: 16,
      color: colorScheme === "dark" ? "#eee" : "#000",
    },
  });

  const [enteredGoalText, setEnteredGoalText] = useState("");
  const [courseGoals, setCourseGoals] = useState<string[]>([]);

  function goalInputHandler(eneteredText: string) {
    setEnteredGoalText(eneteredText);
  }

  function addGoalHandler() {
    setCourseGoals((currentCourseGoals: string[]) => [
      ...currentCourseGoals,
      enteredGoalText,
    ]);
    setEnteredGoalText("");
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.textInput, dynamicStyles.description]}
          placeholder="Your course goal!"
          onChangeText={goalInputHandler}
        />
        <Button title="Add Goal" onPress={addGoalHandler} />
      </View>

      <View style={styles.goalsContainer}>
        {courseGoals.map((goal) => (
          <Text key={goal} style={dynamicStyles.description}>
            {goal}
          </Text>
        ))}
      </View>
    </View>

    // <ParallaxScrollView
    //   headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
    //   headerImage={
    //     <Image
    //       source={require("@/assets/images/partial-react-logo.png")}
    //       style={styles.reactLogo}
    //     />
    //   }
    // >
    // <ThemedView style={styles.stepContainer}></ThemedView>
    // </ParallaxScrollView>
  );
}

// StyleSheet: 자동완성
const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    flex: 1,
    paddingHorizontal: 16,
  },
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
  goalsContainer: {
    flex: 5,
  },
});
