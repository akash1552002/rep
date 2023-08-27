import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const Checkbox = (name,date) => {
  const [isChecked, setIsChecked] = useState(false);

  const handlePress = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View style={styles.checkcontainer}>
      {console.log(name,date)}
      <TouchableOpacity
        onPress={handlePress}
        style={[styles.checkbox, isChecked && styles.checked]}
      ></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  checkcontainer: {
    display: "flex",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    backgroundColor: "#ccc",
  },
  checked: {
    backgroundColor: "#000",
  },
});

export default Checkbox;
