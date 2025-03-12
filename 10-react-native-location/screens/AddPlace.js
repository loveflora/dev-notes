// import { insertPlace } from "@/util/database";
import { Alert } from "react-native";
import PlaceForm from "../components/Places/PlaceForm";

// screen component라서 {navigation} 작성 가능
export default function AddPlace({ navigation }) {
  async function createPlaceHandler(place) {
    try {
      // 데이터 유효성 검사 추가
      if (!place.title || !place.imageUri || !place.location) {
        Alert.alert(
          "입력 오류",
          "모든 필수 정보(제목, 이미지, 위치)를 입력해주세요.",
        );
        return;
      }

      // 디버깅을 위한 로그
      console.log("Saving place:", place);

      // await insertPlace(place);
      navigation.navigate("AllPlaces", {
        place: place,
      });
    } catch (error) {
      console.log("Error saving place:", error);
      Alert.alert("에러", "장소를 저장하는 중 문제가 발생했습니다.");
    }
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}
