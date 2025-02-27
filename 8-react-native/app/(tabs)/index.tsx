import {
  StyleSheet,
  View,
  Button,
  // ScrollView,
  // Text,
  FlatList,
} from "react-native";
//-- react-native
// DOM 요소를 가지고 있지 않아서, HTML 요소 지원하지 않음

// import { HelloWave } from "@/components/HelloWave";
// import ParallaxScrollView from "@/components/ParallaxScrollView";
// import { ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";
// import { TextInput } from "react-native-gesture-handler";

import { useColorScheme } from "@/hooks/useColorScheme";
import { useState } from "react";
import GoalItem from "@/components/GoalItem";
import GoalInput from "@/components/GoalInput";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const dynamicStyles = StyleSheet.create({
    textColor: {
      fontSize: 16,
      color: colorScheme === "dark" ? "#eee" : "#000",
    },
  });

  const [courseGoals, setCourseGoals] = useState<
    { text: string; id: string }[]
  >([]);

  //_ 추가
  function addGoalHandler(enteredGoalText: string) {
    //* FlatList 일 경우
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);

    //* ScrollView 일 경우
    // setCourseGoals((currentCourseGoals: string[]) => [
    //   ...currentCourseGoals,
    //   enteredGoalText,
    // ]);
  }

  //_ 삭제
  function deleteGoalHandler() {
    console.log("delete");
  }

  return (
    <View style={styles.appContainer}>
      <GoalInput onAddGoal={addGoalHandler} dynamicStyles={dynamicStyles} />

      <View style={styles.goalsContainer}>
        <FlatList
          data={courseGoals} // data : 데이터 전달
          renderItem={(itemData) => {
            // renderItem: 각 항목을 어떻게 렌더링할지 정의
            return (
              <GoalItem
                text={itemData.item.text}
                onDeleteItem={deleteGoalHandler}
              />
            );
          }}
          keyExtractor={(item, index) => {
            // 고유한 키를 어떻게 얻을지 정의
            return item.id;
          }}
        />

        {/* ScrollView는 전체 UI가 렌더링될 때마다 안에 있는 항목을 전부 렌더링함 */}
        {/* <ScrollView>
          {courseGoals.map((goal) => (
            <Text
              id={goal}
              style={[dynamicStyles.description, styles.goalItem]}
            >
              {goal}
            </Text>
          ))}
        </ScrollView> */}
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

  goalsContainer: {
    flex: 5,
    color: "red", // cascading 되지 않음!
  },
});
