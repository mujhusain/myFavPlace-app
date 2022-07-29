import { useLayoutEffect, useState, useCallback, useEffect } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/ui/IconButton";

function Map({ navigation, route }) {
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng,
  };
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const region = {
    latitude: initialLocation ? initialLocation.lat : 21.59,
    longitude: initialLocation ? initialLocation.lng : 78.96,
    latitudeDelta: 20,
    longitudeDelta: 20,
  };
  function selectLocationHandler(event) {
    if(initialLocation){
      return;
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat: lat, lng: lng });
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location Picked",
        "Please selected a location by tapping!"
      );
      return;
    }

    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (!initialLocation) {
      navigation.setOptions({
        headerRight: ({ tintColor }) => (
          <IconButton
            name="save"
            size={25}
            color={tintColor}
            onPress={savePickedLocationHandler}
          />
        ),
      });
    }
  }, [navigation, savePickedLocationHandler]);
  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: { flex: 1 },
});
