import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../store/auth-context";

function WelcomeScreen() {
  const [fetchedMessage, setFetchedMessage] = useState("");

  // token 가져오기
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  useEffect(() => {
    // async, await 사용해도 됨
    axios
      .get(
        "https://udemy-react-http-2f0b2-default-rtdb.firebaseio.com/message.json?auth=" +
          token, // token과 함께 전송 (인증된 유저가 보낸 요청인지 확인)
      )
      .then((response) => {
        // console.log("✅ 응답:", response);
        setFetchedMessage(response.data);
      })
      .catch((error) => {
        console.error("❌ 에러:", error);
      });
  }, []);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
