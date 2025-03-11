import IconButton from "@/components/ui/IconButton";
import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

// Map 컴포넌트는 Screen으로 등록된 화면 컴포넌트이므로, navigation 프로퍼티 사용 가능
export default function Map({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState();

  const region = {
    latitude: 37.38,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // 위치 위도 & 경도 정보 가져오기
  function selectLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat, lng });
  }

  // useCallback() : 컴포넌트 내에 정의한 함수가 불필요하게 재생산되지 않도록 함
  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("No location picked!", "You have to pick a location first");
      return;
    }

    // AddPlace 화면으로 이동
    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]); // navigation이나 selectedLocation 상태 값이 바뀔 때마다, useCallback 함수가 재생산됨.

  // useLayoutEffect: 최초로 렌더링될 때 바로 코드 실행
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]); // 의존성 추가 (불필요하게 함수 재생산안되게 함)

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
