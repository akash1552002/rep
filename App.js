import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomePage from "./components/HomePage";
import EntryPage from "./components/EntryPage";
import AttendancePage from "./components/AttendancePage";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// function Home() {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <HomePage />
//     </View>
//   );
// }

// function Entry() {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <EntryPage />
//     </View>
//   );
// }
// function Attendance() {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <AttendancePage />
//     </View>
//   );
// }
// const Home = HomePage;
// const Entry = EntryPage;
// const Attendance = AttendancePage;
// const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();
export default function App() {
  return (
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
      </Stack.Navigator>
    </NavigationContainer>
    // <NavigationContainer>
    //   <Tab.Navigator>
    //     <Tab.Screen
    //       name="Home"
    //       component={Home}
    //       options={{
    //         tabBarLabel: "Home",
    //         tabBarIcon: ({ color, size }) => (
    //           <MaterialCommunityIcons name="home" color={color} size={size} />
    //         ),
    //       }}
    //     />

    //     <Tab.Screen
    //       name="Entry"
    //       component={Entry}
    //       options={{
    //         tabBarLabel: "Entry",
    //         tabBarIcon: ({ color, size }) => (
    //           <MaterialCommunityIcons
    //             name="book-plus"
    //             color={color}
    //             size={size}
    //           />
    //         ),
    //       }}
    //     />
    //     <Tab.Screen
    //       name="Attendance"
    //       component={Attendance}
    //       options={{
    //         tabBarLabel: "Attendance",
    //         tabBarIcon: ({ color, size }) => (
    //           <MaterialCommunityIcons
    //             name="book-open"
    //             color={color}
    //             size={size}
    //           />
    //         ),
    //       }}
    //     />
    //   </Tab.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
