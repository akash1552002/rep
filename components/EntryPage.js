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

    seter(error ? error : "successful");
    loader();
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

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.attend}>
        <Button
          title="Record"
          onPress={async () => {
            const { error } = await supabase
              .from("student")
              .delete()
              .eq("name", title);
            seter(error);
            loader();
          }}
        />
      </View>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
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

      <SafeAreaView style={styles.safeview}>
        <FlatList
          data={students}
          renderItem={({ item }) => <Item title={item.name} />}
          keyExtractor={(item) => item.name}
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
    // backgroundColor: "#ffffff",
    padding: 5,
    fontSize: 15,
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
});
