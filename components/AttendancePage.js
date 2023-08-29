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

const Checkbox = ({ name }) => {
  const getDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${year}-${month}-${date}`;
  };
  const [isChecked, setIsChecked] = useState(false);

  const checkLoader = async () => {
    const { data, error } = await supabase
      .from("Attendance")
      .select("*")
      .eq("std_name", name)
      .eq("pdate", getDate());

    if (data.length > 0 && data[0].presence === "Present") {
      setIsChecked(true);
    }
    //  else {
    // if (data.id===data.id) {
    //   const { data, error } = await supabase
    //     .from("Attendance")
    //     .insert([{ std_name: name, presence: "Absent", pdate: getDate() }])
    //     .select();
    // }
    // }
  };
  useEffect(() => {
    checkLoader();
  }, []);

  const handlePress = () => {
    setIsChecked(!isChecked);
    deliver();
  };

  const deliver = async () => {
    const result = isChecked ? "Absent" : "Present";

    try {
      const { data, error } = await supabase
        .from("Attendance")
        .select("*")
        .eq("pdate", getDate())
        .eq("std_name", name);

      if (data.length > 0) {
        const { data, error } = await supabase
          .from("Attendance")
          .update({ presence: result })
          .eq("std_name", name)
          .eq("pdate", getDate());
      } else {
        const { data, error } = await supabase
          .from("Attendance")
          .insert([{ std_name: name, presence: "Absent", pdate: getDate() }])
          .select();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handlePress}
        style={[styles.checkbox, isChecked && styles.checked]}
      ></TouchableOpacity>
    </View>
  );
};

const Attendance = () => {
  const getDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${year}-${month}-${date}`;
  };

  const [currentDate, setCurrentDate] = useState(getDate());
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  const loader = async () => {
    try {
      const { data, error } = await supabase.from("student").select("*");
      setStudents(data);
      setError(error != null ? error.message : "successful");
    } catch (error) {
      setError(error);
    }
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
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.safeview}>
        <View style={styles.dates}>
          <Text style={styles.datefont}>{currentDate}</Text>
          <Text>message: {error}</Text>
        </View>
        <FlatList
          data={students}
          renderItem={({ item }) => <Item title={item.name} />}
          keyExtractor={(item) => item.name}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
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
  safeview: {
    flex: 1,
    paddingBottom: 20,
  },
});

export default Attendance;
