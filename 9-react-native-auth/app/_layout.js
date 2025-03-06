import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../constants/style";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import AuthContextProvider from "../store/auth-context";

const Stack = createNativeStackNavigator();

// 1. 인증되지 않은(비로그인) 유저 Navigation
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      {/* 참고: AuthContent.js 에서 navigation.navigate("Signup"); */}
    </Stack.Navigator>
  );
}

// 2. 인증된(로그인) 유저만 접근할 수 있는 Navigation
function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthContextProvider>
      <StatusBar style="light" />
      {/* <NavigationContainer> */}
      <AuthStack />
      {/* </NavigationContainer> */}
    </AuthContextProvider>
  );
}
