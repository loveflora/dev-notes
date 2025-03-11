import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import AllPlaces from "../screens/AllPlaces";
import AddPlace from "../screens/AddPlace";
import IconButton from "../components/ui/IconButton";
import { Colors } from "@/constants/Colors";

const Stack = createStackNavigator();

// 🔹 네비게이션 타입 정의
type RootStackParamList = {
  AllPlaces: undefined;
  AddPlace: undefined;
};

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      {/* <View style={styles.container}> */}
      {/* <NavigationContainer> */}
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: Colors.gray700,
          contentStyle: { backgroundColor: Colors.gray700 },
        }}
      >
        <Stack.Screen
          name="AllPlaces"
          component={AllPlaces}
          options={({
            navigation,
          }: {
            navigation: StackNavigationProp<RootStackParamList, "AllPlaces">;
          }) => ({
            title: "Your Favorite Places",
            headerRight: ({ tintColor }: { tintColor?: string }) => (
              <IconButton
                icon="add"
                size={24}
                color={tintColor || "black"} // tintColor가 undefined일 경우 기본값 설정
                onPress={() => navigation.navigate("AddPlace")}
              />
            ),
          })}
        />
        <Stack.Screen
          name="AddPlace"
          component={AddPlace}
          options={{
            title: "Add a new Place",
          }}
        />
      </Stack.Navigator>
      {/* </View> */}
      {/* </NavigationContainer> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray700,
  },
});
