import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Button,
  TextInput,
  SafeAreaView,
  FlatList,
  View,
} from "react-native";
import { supabase } from "./supabase";

const Item = ({ title, onDelete }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.attend}>
      <Button title="Remove" onPress={() => onDelete(title)} />
    </View>
  </View>
);

export default function Entry() {
  const [name, setName] = useState("");
  const [phonenumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState("");
  const [joindate, setJoinDate] = useState("");
  const [er, setEr] = useState("no message");
  const [students, setStudents] = useState([]);

  const onAddStudent = async () => {
    try {
      const { error } = await supabase.from("student").insert([
        {
          name: name.slice(0, name.endsWith(" ") ? -1 : name.length),
          phonenum: phonenumber,
          address: address,
          joindate: joindate,
        },
      ]);
      if (error) {
        setEr(error.message);
      } else {
        setEr("successful");
        loader();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteStudent = async (name) => {
    try {
      const { error } = await supabase
        .from("student")
        .delete()
        .eq("name", name);
      if (error) {
        setEr(error.message);
      } else {
        setEr("successful");
        loader();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loader = async () => {
    try {
      const { data, error } = await supabase.from("student").select("*");
      if (error) {
        console.error(error);
      } else {
        setStudents(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loader();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Enter Name"
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phonenumber}
        placeholder="Enter Phone Number"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={setAddress}
        value={address}
        placeholder="Enter Address"
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        onChangeText={setJoinDate}
        value={joindate}
        placeholder="Enter Joining Date YYYY-MM-DD"
        keyboardType="numeric"
      />
      <View style={styles.buttonContainer}>
        <Button title="Add Student" color="#2196F3" onPress={onAddStudent} />
      </View>
      <Text style={styles.message}>Message: {er}</Text>
      <SafeAreaView style={styles.safeview}>
        <FlatList
          data={students}
          renderItem={({ item }) => (
            <Item title={item.name} onDelete={onDeleteStudent} />
          )}
          keyExtractor={(item) => item.id.toString()} // Assuming there is an "id" property
        />
      </SafeAreaView>
    </SafeAreaView>
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
  safeview: {
    flex: 1,
    paddingBottom: 20,
  },
  item: {
    flexDirection: "row",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    gap: 5,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    width: "70%",
  },
  attend: {
    color: "#ffffff",
    padding: 5,
    fontSize: 15,
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
});
