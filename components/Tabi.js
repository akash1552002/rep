import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <HomePage />
      <Button
        title="Go to Entry"
        onPress={() => navigation.navigate("Entry")}
      />
    </View>
  );
}

function Entry({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <EntryPage />
    </View>
  );
}
const Tab = createBottomTabNavigator();
export default function Tabi() {
  return (
    <View>
      <Text>Tabi</Text>
      <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Entry} />
    </Tab.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({})
