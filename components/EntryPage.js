import {
  StyleSheet,
  Text,
  Button,
  TextInput,
  SafeAreaView,
  FlatList,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { supabase } from "./supabase";
export default function Entry() {
  const [name, setname] = useState("");
  const [phonenumber, setphonenumber] = useState();
  const [address, setaddress] = useState("");
  const [joindate, setjoindate] = useState();
  // --
  const [er, seter] = useState("");
  const onAddStudent = async () => {
    const { data, error } = await supabase
      .from("student")
      .insert([
        {
          name: name,
          phonenum: phonenumber,
          address: address,
          joindate: joindate,
        },
      ])
      .select();

    seter(error ? error.message : "successful");
  };
  const [students, setStudents] = useState([]);

  const loader = async () => {
    const { data, error } = await supabase.from("student").select("*");
    setStudents(data);
    seter(error);
  };

  useEffect(() => {
    loader();
  }, []);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setname}
        value={name}
        placeholder="Enter Name"
        keyboardType="default"
      />

      <TextInput
        style={styles.input}
        onChangeText={setphonenumber}
        value={phonenumber}
        placeholder="Enter Phone Number"
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        onChangeText={setaddress}
        value={address}
        placeholder="Enter Address"
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        onChangeText={setjoindate}
        value={joindate}
        placeholder="Enter Joining Date YYYY-MM-DD"
        keyboardType="numeric"
      />
      <View style={styles.buttonContainer}>
        <Button title="Add Student" color="#2196F3" onPress={onAddStudent} />
      </View>
      <Text style={styles.message}>Message: {er}</Text>

      <SafeAreaView style={styles.message}>
        <FlatList
          data={students}
          renderItem={({ item }) => <Text>{item.name}</Text>}
          keyExtractor={(item) => item.name}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  message: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
  },
});
