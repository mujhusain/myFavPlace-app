import PlacesList from "../components/places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { fetchPlaces } from "../util/database";

function AllPlaces({ route }) {
  const [placeList, setPlaceList] = useState([]);
  const isFocused = useIsFocused();

  async function loadPlaces() {
    const places = await fetchPlaces();
    setPlaceList(places);
  }
  useEffect(() => {
    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  return <PlacesList loadPlaces={loadPlaces} places={placeList} />;
}

export default AllPlaces;
