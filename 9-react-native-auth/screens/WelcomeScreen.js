import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Alert, Button, Platform, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../store/auth-context";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

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
    async function configurePushNotifications() {
      // try {
      const { status } = await Notifications.getPermissionsAsync();
      // status:  현재 PUSH Token을 가져올 권한 여부
      let finalStatus = status;
      // finalStatus: helper variable
      console.log("🔍 Initial Permission Status:", status);

      //* 권한이 없다면?
      //-> 권한 요청
      if (finalStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      //* 권한 요청했는데도 권한이 없다면?
      //-> alert창
      if (finalStatus !== "granted") {
        Alert.alert(
          "Permission required",
          "Push notifications need the appropriate permissions.",
        );
        return;
      }

      // 🚨 Expo Go에서는 push token을 지원하지 않음. 확인 후 중지.
      // if (!Constants.isDevice) {
      //   console.log("❌ Must use physical device for Push Notifications");
      //   // console.log("📌 Constants 전체:", Constants);
      //   console.log("📌 Constants.isDevice:", Constants.isDevice);
      //   // console.log("📌 Constants.expoConfig:", Constants.expoConfig);
      //   return;
      // }

      //* 권한 확인 및 요청 이후
      //_ Push Token 가져오기
      // getExpoPushTokenAsync() : 기기에서 PUSH token 가져올 때 호출하는 메서드
      // ExpoPushToken은 Expo의 PUSH 알림 서버(여러 기기에 알림 요청을 보낼 수 있는 서버)에 사용

      // async ; promise 반환 ;
      // -> .then() or async/await 사용하여, promise가 resolve한 데이터인 Push token을 얻음
      //.. 1) async/await
      // configurePushNotifications() 안에 있고, async 존재
      // const pushTokenData = await Notifications.getExpoPushTokenAsync();
      try {
        const pushTokenData = await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig.extra.eas.projectId,
        });
        console.log("📌 pushTokenData:", pushTokenData);
      } catch (tokenError) {
        console.error("⚠️ 토큰 가져오기 오류:", tokenError);
      }

      //.. 2) then
      // Notifications.getExpoPushTokenAsync().then((pushToken) => {
      //   console.log(pushToken);
      // });
      // } catch (error) {
      // console.error("❌ Error fetching push token:", error);
      // }

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
    }

    // 헬퍼 함수 실행
    configurePushNotifications();
  }, []);

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

  // function sendPushNotificationHandler() {
  //   fetch("https://exp.host/--/api/v2/push/send", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       title: "Test - sent from a device!",
  //       body: "This is test !",
  //     }),
  //   });
  // }

  async function sendPushNotificationHandler() {
    try {
      const response = await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "ExponentPushToken[-jBnGpDYFjLcsijDpCq-FM]",
          title: "Test - sent from a device!",
          body: "This is test!",
        }),
      });

      const data = await response.json();
      console.log("📩 푸시 알림 응답:", data); // 응답을 출력해서 확인

      if (!response.ok) {
        console.error("❌ 푸시 요청 실패:", data);
      }
    } catch (error) {
      console.error("❌ 오류 발생:", error);
    }
  }

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Button title="PUSH Notification" onPress={sendPushNotificationHandler} />
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
