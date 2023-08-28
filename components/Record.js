import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  Text,
  Button,
  View,
} from "react-native";
import { supabase } from "./supabase";

export default function Lister() {
  const getDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${year}-${month}-${date}`;
  };

  const [currentDate, setCurrentDate] = useState(getDate());
  const [std, setStd] = useState([]);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      let { data, error } = await supabase
        .from("Attendance")
        .select("*")
        .eq("pdate", currentDate);
      setStd(data);
      setError(error);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const Item = ({ title, presence }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.attend}>{presence}</Text>
    </View>
  );

  const findRecord = async () => {
    const { data, error } = await supabase
      .from("Attendance")
      .select("*")
      .eq("pdate", currentDate);
    setStd(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.safearea}>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={setCurrentDate}
            value={currentDate}
            placeholder="Enter Date YYYY-MM-DD"
            keyboardType="numeric"
          />
          <View style={styles.buttonContainer}>
            <Button
              title="List Date Record"
              color="#2196F3"
              onPress={findRecord}
            />
          </View>
          <Text style={styles.msg}>message: {error}</Text>
        </View>
        <FlatList
          data={std}
          renderItem={({ item }) => (
            <Item title={item.std_name} presence={item.presence} />
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    fontSize: 18,
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
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
    width: "80%",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 5,
  },
  attend: {
    color: "#ffffff",
    backgroundColor: "#000000",
    padding: 5,
    width: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: "100%",
    width: "100%",
  },
  safearea: {
    flex: 1,
    paddingBottom: 20,
  },
  msg: {
    marginLeft: "5%",
  },
});
