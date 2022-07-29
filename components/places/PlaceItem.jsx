import { Image, Pressable, Text, View, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import { deletePlace } from "../../util/database";
import IconButton from "../ui/IconButton";

function PlaceItem({ place, onSelect,loadPlaces }) {
  async function deletePlaceHandler(){
    await deletePlace(place.id);
    loadPlaces()
  }
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onSelect.bind(this,place.id)}
    >
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.info}>
        <View >
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
        </View>
        <View>
          <IconButton name="trash" color={Colors.primary800} size={25} onPress={deletePlaceHandler} >DELETE</IconButton>
        </View>
      </View>
    </Pressable>
  );
}

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadious: 8,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
  },
  info: {
    flex: 2,
    padding: 12,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.gray700,
  },
  address: {
    color: Colors.gray700,
    fontSize: 12,
  },
});
