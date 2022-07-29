import { StyleSheet, View, Alert,Text, Image } from "react-native";
import { useState } from "react";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../ui/OutlinedButton";

function ImagePicker({onImageTaken}) {
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  const [pickedImage, setPickedImage] = useState();

  async function verifyPermission() {
    if (cameraPermissionInformation.status == PermissionStatus.UNDETERMINED) {
      const permissionResponce = await requestPermission();

      return permissionResponce.granted;
    }
    if (cameraPermissionInformation.status == PermissionStatus.DENIED) {
      Alert.alert("Insuficient Permission", "Give camera Permission");
      return false;
    }
    return true;
  }

  async function takeImagehandler() {
    const hasPermisssion = await verifyPermission();
    if (hasPermisssion) {
      const image = await launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      });
      setPickedImage(image.uri);
      onImageTaken(image.uri)
    }
  }
  let image = <Text>No Image is taken yet!</Text>;
  if (pickedImage) {
    image = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{image}</View>
      <OutlinedButton icon="camera" onPress={takeImagehandler}>Take Image</OutlinedButton>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: Colors.primary100,
    borderRadious: 8,
  },
  image: {
    width: "100%",
    height: 200,
  },
});
