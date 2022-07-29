import { Pressable,StyleSheet,Text } from "react-native";
import {Ionicons} from '@expo/vector-icons';
import { Colors } from "../../constants/colors";

function OutlinedButton({onPress,children,icon}) {
  return (
  <Pressable style={({ pressed})=>[styles.button, pressed && styles.pressed]} onPress={onPress}>
    <Ionicons style={styles.icon} name={icon} size={25} color={Colors.primary500}/>
    <Text style={styles.text} >{children}</Text>
  </Pressable>
    )
}

export default OutlinedButton;

const styles= StyleSheet.create({
    button:{
        paddingHorizontal: 12,
        margin:4,
        flexDirection:'row', 
        justifyContent: "center",
        alignItems: "center",
        borderWidth:1,
        borderColor:Colors.primary500
    },
    pressed: {
        opacity:0.7,
    },
    icon: {
        margin: 6
    },
    text: {
        color:Colors.primary500
    },
})