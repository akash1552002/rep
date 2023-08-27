import {
  StyleSheet,
  Text,
  Button,
  TextInput,
  SafeAreaView,
  FlatList,
  View,
} from "react-native";
import React from "react";
import { supabase } from "./supabase";
export default function Entry() {
  const [name, setname] = React.useState("");
  const [phonenumber, setphonenumber] = React.useState();
  const [address, setaddress] = React.useState("");
  const [joindate, setjoindate] = React.useState();
  // --
  const [er, seter] = React.useState("");
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
    // .select();
  };
  const [students, setStudents] = React.useState([]);

  const loader = async () => {
    const { data, error } = await supabase.from("student").select("*");
    setStudents(data);
    seter(error);
  };

  React.useEffect(() => {
    loader();
  }, []);
  // --
  return (
    <View style={styles.container}>
      {/* {console.log(students)} */}
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
        placeholder="Enter Joining Date"
        keyboardType="numeric"
      />
      <View style={styles.buttonContainer}>
        <Button
          style={styles.btn}
          title="Add Student"
          color="#2196F3"
          onPress={onAddStudent}
          // accessibilityLabel="Learn more about this purple button"
        />
      </View>
      <Text style={styles.message}>Message: {er}</Text>
      {/* <View style={[styles.list]}>
        {students.map((x) => (
          <Text key={x.name}>{x.name}</Text>
        ))}
      </View> */}
      <SafeAreaView style={styles.message}>
        <FlatList
          data={students}
          renderItem={({ item }) => <Text>{item.name}</Text>}
          keyExtractor={(item) => item.name}
        />
      </SafeAreaView>
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
  message: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
  },
});
