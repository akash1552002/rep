import { StyleSheet, Button, Text, View } from "react-native";
import React from "react";
export default function Home({ navigation }) {
  return (
    <View>
      {/* <View>
        <Button title="Entry" onPress={() => navigation.navigate("EntryPage")} />
      </View> */}
      <View style={styles.container}>
        <Button
          title="Add Student"
          onPress={() => navigation.navigate("Entry")}
        />
      </View>
      <View style={styles.container}>
        <Button
          title="Attendance"
          onPress={() => navigation.navigate("Attendance")}
        />
      </View>
      <View style={styles.container}>
        <Button title="Record" onPress={() => navigation.navigate("Lister")} />
      </View>
      {/* <Button
        title="Go to Entry"
        onPress={() => navigation.navigate("Entry")}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});
