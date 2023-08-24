import { StyleSheet, Text, Button, TextInput, View } from "react-native";
import React from "react";

export default function Entry({ navigation }) {
  const [text, onChangeText] = React.useState("");
  const [number, onChangeNumber] = React.useState("");

  return (
    <View style={styles.container}>
      {/* <View style={styles.inputSection}>
        <Text>name</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Enter Name"
          keyboardType="name"
        />
      </View> */}
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Enter Name"
        keyboardType="name"
      />

      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Enter Phone Number"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Enter Address"
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Enter Joining Date"
        keyboardType="numeric"
      />
      <View style={styles.buttonContainer}>
        <Button
          style={styles.btn}
          title="Add Student"
          color="#2196F3"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
      {/* onPress={handleSignUp} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#242526",
    height: "100%",
    width: "100%",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
  },
  inputSection: {
    flexDirection: "row",
    padding: 10,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 5,
  },
});
