// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


// function Home({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <HomePage />
//       <Button
//         title="Go to Entry"
//         onPress={() => navigation.navigate("Entry")}
//       />
//     </View>
//   );
// }

// function Entry({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
//       <EntryPage />
//     </View>
//   );
// }
// const Tab = createBottomTabNavigator();
// export default function Tabi() {
//   return (
//     <View>
//       <Text>Tabi</Text>
//       <Tab.Navigator>
//       <Tab.Screen name="Home" component={Home} />
//       <Tab.Screen name="Settings" component={Entry} />
//     </Tab.Navigator>
//     </View>
//   )
// }

// const styles = StyleSheet.create({})

// npm install @supabase/supabase-js
// npm install react-native-elements @react-native-async-storage/async-storage react-native-url-polyfill
// npx expo install expo-secure-store
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { supabase } from "./supabase";
function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${year}-${month}-${date}`;
}
const Checkbox = ({ name }) => {
  const [isChecked, setIsChecked] = React.useState(false);

  const handlePress = async () => {
    const [err, seterr] = React.useState("");
    setIsChecked(!isChecked);
    if (isChecked != true) {
      const { data, error } = await supabase
        .from("Attendance")
        .insert([{ std_name: name, presence: "Present", pdate: getDate() }])
        .select();
      seterr(error.message);
      console.log("yes");
    } else {
      const { data, error } = await supabase
        .from("Attendance")
        .update({ presence: "Absent" })
        .select("name, pdate")
        .eq(name, getDate());
      seterr(error.message);
      console.log("no");
      
    }
    {console.log(err)}
  };

  return (
    <View style={styles.checkcontainer}>
      
      <TouchableOpacity
        onPress={handlePress}
        style={[styles.checkbox, isChecked && styles.checked]}
      ></TouchableOpacity>
    </View>
  );
};

const Attendance = () => {
  const [currentDate, setCurrentDate] = useState(getDate());
  const [students, setStudents] = useState([]);
  const loader = async () => {
    const { data, error } = await supabase.from("student").select("*");
    setStudents(data);
    // seter(error);
  };

  useEffect(() => {
    loader();
  }, []);

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Checkbox name={title} />
    </View>
  );

  return (
    <View>
      <SafeAreaView style={styles.container}>
        <View style={styles.dates}>
          <Text style={styles.datefont}>{currentDate}</Text>
        </View>
        <FlatList
          data={students}
          renderItem={({ item }) => <Item title={item.name} />}
          keyExtractor={(item) => item.name}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  checkcontainer: {
    display: "flex",
    alignItems: "center",
  },
  checkbox: {
    width: 40,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#ccc",
  },
  checked: {
    backgroundColor: "#000",
  },
  item: {
    flexDirection: "row",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    gap: 5,
  },
  title: {
    fontSize: 18,
    width: "85%",
  },
  dates: {
    alignItems: "center",
  },
  datefont: {
    fontSize: 20,
  },
});

export default Attendance;
