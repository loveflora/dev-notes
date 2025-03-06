import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { Colors } from "../constants/style";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import AuthContextProvider, { AuthContext } from "../store/auth-context";
import IconButton from "../components/ui/IconButton";

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
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          // logout button
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              size={24}
              color={tintColor}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <>
      {/* <NavigationContainer> */}
      {authCtx.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
      {/* </NavigationContainer> */}
    </>
  );
}

export default function App() {
  return (
    <AuthContextProvider>
      <StatusBar style="light" />
      <Navigation />
    </AuthContextProvider>
  );
}
