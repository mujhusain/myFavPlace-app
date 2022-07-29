import { useState } from "react";
import { StyleSheet, ScrollView, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";
import Button from "../ui/Button";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import {Place} from '../../Models/Place';

function PlaceForm({onCreatePlace}) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [pickedImageUri, setPickedImageUri] = useState("");
  const [pickedLocation, setPickedLocation] = useState("");

  function changeTitle(title) {
    setEnteredTitle(title);
  }

  function onImagetakenHandler(imageUri) {
    setPickedImageUri(imageUri);
  }
  function onLocationHandler(location) {
    setPickedLocation(location);
  }

  function handleSubmit() {
    const data=new Place(enteredTitle,pickedImageUri,pickedLocation)

    onCreatePlace(data)
  }
  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitle}
          value={enteredTitle}
        />
        <ImagePicker onImageTaken={onImagetakenHandler} />
        <LocationPicker onLocationTaken={onLocationHandler} />
        <Button onPress={handleSubmit}>Add Place</Button>
      </View>
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 25,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 18,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 5,
    paddingVertical: 6,
    fontSize: 20,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
    borderRadius: 6,
  },
});
