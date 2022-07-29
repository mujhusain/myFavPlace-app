import { useEffect,useState } from "react";
import { Image, StyleSheet, ScrollView, Text, View } from "react-native";
import OutlinedButton from "../components/ui/OutlinedButton";
import { Colors } from "../constants/colors";
import { fetchPlaceDetails } from "../util/database";

function PlaceDetails({ route,navigation }) {

  const [fechedPlace,setFetchPlace]=useState()
  function showOnMapHandler() {
    navigation.navigate("Map",{
      initialLat:fechedPlace.location.lat,
      initialLng:fechedPlace.location.lng
    })
  }

  const selectedPlaceId = route.params.placeId;
  useEffect(() => {
    async function loadPlaceData() {
      const place=await fetchPlaceDetails(selectedPlaceId)
      setFetchPlace(place);
      navigation.setOptions({
        title:place.title
      })

    }
    loadPlaceData()
  }, [selectedPlaceId]);

if(!fechedPlace){
  return <View style={styles.fallBack} >
    <Text>Loading Place Data...</Text>
  </View>
}

  return (
    <ScrollView>
      <Image style={styles.image} source={{uri:fechedPlace.imageUri}} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fechedPlace.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

export default PlaceDetails;

const styles = StyleSheet.create({
  fallBack:{
flex:1,
justifyContent: 'center',
alignItems: 'center',
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    paddding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});
