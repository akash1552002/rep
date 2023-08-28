// import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./components/HomePage";
import EntryPage from "./components/EntryPage";
import AttendancePage from "./components/AttendancePage";
import Record from "./components/Record";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    // <SafeAreaView>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ title: "HomePage" }}
        />
        <Stack.Screen
          name="Entry"
          component={EntryPage}
          options={{ title: "Entry" }}
        />
        <Stack.Screen name="Attendance" component={AttendancePage} />
        <Stack.Screen name="Record" component={Record} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({});
