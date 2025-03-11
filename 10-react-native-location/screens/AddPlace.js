import PlaceForm from "../components/Places/PlaceForm";

// screen component라서 {navigation} 작성 가능
export default function AddPlace({ navigation }) {
  function createPlaceHandler(place) {
    navigation.navigate("AllPlaces", {
      place,
    });
  }
  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}
