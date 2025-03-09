import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../store/auth-context";
import * as Notifications from "expo-notifications";

//_ 해당하는 알림이 들어왔을 때 어떻게 처리할지
// app 가동될 때 한 번만 실행 (컴포넌트 밖)
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

// 알림 권한 요청 (앱이 실행될 때)
// useEffect(() => {
//   async function requestPermissions() {
//     const { status } = await Notifications.requestPermissionsAsync();
//     if (status !== "granted") {
//       alert("알림 권한을 허용해 주세요!");
//     }
//   }
//   requestPermissions();
// }, []);

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
      });
    // .catch((error) => {
    //   console.error("❌ 에러:", error);
    // });
  }, []);

  //_ 받은 알림을 어떻게 처리할지
  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(notification);

        const userName = notification.request.content.data.userName;
        console.log(userName);
      },
    );

    // 사용자 상호작용
    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      },
    );

    // clean-up
    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);

  //_ local notification 예약
  // async: promise return
  function scheduleNotificationHandler() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Enter the title",
        body: "Enter the body",
        // 표면적으로 보이진 않지만, 알림을 받을 때 추출할 수 있는 코드 -> addNotificationReceivedListener
        data: {
          userName: "Sarah",
        },
      },
      trigger: {
        seconds: 3,
      },
    });
  }

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Button
        title="Scheduled Notification"
        onPress={scheduleNotificationHandler}
      />
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
