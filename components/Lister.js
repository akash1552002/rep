import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  Text,
  Button,
  View,
} from "react-native";
import React from "react";
import { supabase } from "./supabase";
export default function Lister() {
  const getDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${year}-${month}-${date}`;
  };

  const [currentDate, setCurrentDate] = React.useState(getDate());
  const [students, setStudents] = React.useState([]);
  const [error, setError] = React.useState(null);

  const loader = async () => {
    try {
      const { data, error } = await supabase
        .from("Attendance")
        .select("*")
        .eq("pdate", currentDate);
      console.log(data);
      setStudents(data);
      setError(error);
    } catch (error) {
      console.log(error.message);
      // Handle and display the error to the user
    }
  };

  React.useEffect(() => {
    loader();
  }, []);

  const Item = ({ title, presence }) => (
    <View style={styles.item}>
      {console.log(title)}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.attend}>{presence}</Text>
    </View>
  );
  const findrecord = async () => {
    const { data, error } = await supabase
      .from("Attendance")
      .select("*")
      .eq("pdate", currentDate);
    setStudents(data);
  };
  return (
    <View>
      <SafeAreaView>
        <View>
          {/* <Text style={styles.datefont}>{currentDate}</Text> */}
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
              onPress={findrecord}
              // accessibilityLabel="Learn more about this purple button"
            />
          </View>
        </View>
        <FlatList
          data={students}
          renderItem={({ item }) => (
            <Item title={item.std_name} presence={item.presence} />
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </View>
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
    width: "85%",
  },
  dates: {
    alignItems: "center",
  },
  datefont: {
    fontSize: 20,
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
  },
});
