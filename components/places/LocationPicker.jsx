import { View, StyleSheet, Alert, Text, Image } from "react-native";
import { useState, useEffect } from "react";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../ui/OutlinedButton";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

import { getLocation } from "../../util/location";

function LocationPicker({ onLocationTaken }) {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  const [pickedLocation, setPickedLocation] = useState();
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    // here to add human readable addresss to pickedLocation object with help of GeoCoding api
    // here Mocking the Adderess
    const address="human Readable Address"
    onLocationTaken({...pickedLocation,address:address});
  }, [pickedLocation]);

  async function verifyPermission() {
    if (locationPermissionInformation.status == PermissionStatus.UNDETERMINED) {
      const permissionResponce = await requestPermission();

      return permissionResponce.granted;
    }
    if (locationPermissionInformation.status == PermissionStatus.DENIED) {
      Alert.alert("Insuficient Permission", "Give location Permission");
      return false;
    }
    return true;
  }
  async function getLocationHandler() {
    const hasPermisssion = await verifyPermission();
    if (!hasPermisssion) {
      return false;
    }
    const loaction = await getCurrentPositionAsync();
    setPickedLocation({
      lat: loaction.coords.latitude,
      lng: loaction.coords.latitude,
    });
  }
  function handelPickOnMap() {
    navigation.navigate("Map");
  }

  let location = <Text>No Location is picked yet!</Text>;
  if (pickedLocation) {
    location = (
      <Image
        style={styles.image}
        source={{ uri: getLocation(pickedLocation.lat, pickedLocation.lng) }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{location}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={handelPickOnMap}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: Colors.primary100,
    borderRadious: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
