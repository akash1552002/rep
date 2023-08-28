import { StyleSheet, Button, View } from "react-native";
import React from "react";
export default function Home({ navigation }) {
  return (
    <View>
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
        <Button title="Record" onPress={() => navigation.navigate("Record")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});
