import { FlatList, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/colors";
import PlaceItem from "./PlaceItem";

function PlacesList({ places,loadPlaces }) {
  const navigation=useNavigation();

  function onSelectPlaceHandler(id){
    navigation.navigate("PlaceDetails",{placeId:id});
  }
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallBackContainer}>
        <Text style={styles.fallbackText}>
          No Places In List. Start Adding!
        </Text>
      </View>
    );
  }
 
  return (
    <View style={styles.list}>
      <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlaceItem loadPlaces={loadPlaces} place={item} onSelect={onSelectPlaceHandler} />}
      />
    </View>
  );
}

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 15,
  },
  fallBackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 18,
    color: Colors.primary200,
  },
});
