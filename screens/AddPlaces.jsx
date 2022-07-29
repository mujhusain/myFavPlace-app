import PlaceForm from "../components/places/PlaceForm";
import { insertPlace } from "../util/database";

function AddPlaces({ navigation }) {
  async function createPlaceHandler(data) {
    await insertPlace(data)
    navigation.navigate("All Places");
  }
  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default AddPlaces;
