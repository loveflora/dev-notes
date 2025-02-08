import { Image, StyleSheet, Platform, View, Text, Button } from "react-native";
//-- react-native
// DOM 요소를 가지고 있지 않아서, HTML 요소 지원하지 않음

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.dummyText}>Another Text</Text>
      </View>
      <Text style={styles.dummyText}>Hello world!</Text>
      <Button title="Tap me!" />
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  dummyText: {
    margin: 16,
    borderWidth: 1,
    borderColor: "red",
    padding: 16,
  },
});
