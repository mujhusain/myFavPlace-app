import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPlaces from "./screens/AllPlaces";
import AddPlaces from "./screens/AddPlaces";
import IconButton from "./components/ui/IconButton";
import { Colors } from "./constants/colors";
import Map from "./screens/Map";
import { init } from "./util/database";
import AppLoading from "expo-app-loading";
import PlaceDetails from "./screens/PlaceDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized,setDbInitialized] =useState(false);
  useEffect(() => {
    init().then(() => setDbInitialized(true)).catch((err)=>console.log(err))
  },[])

  if(!dbInitialized){
    return <AppLoading />
  }

  return (
    <>
      <StatusBar color="light" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle:{backgroundColor:Colors.primary500},
          headerTintColor:Colors.gray700,
          contentStyle:{backgroundColor:Colors.gray700}
        }} >
          <Stack.Screen
            name="All Places"
            component={AllPlaces}
            options={({ navigation }) => ({
              title:'Your Favorite Places',
              headerRight: ({ tintColor }) => (
                <IconButton
                  name="add"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          />
          <Stack.Screen name="AddPlace" component={AddPlaces} options={{
            title:'Add a new Place'
          }} />
          <Stack.Screen name="Map" component={Map} options={{
            title:'Select Location'
          }} />
          <Stack.Screen name="PlaceDetails" component={PlaceDetails} options={{
            title:'Loading Place...'
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
