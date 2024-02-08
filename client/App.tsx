import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
export default function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("http://192.168.0.80:3000/");
      setMessage(res.data.message);
    };
    getData();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Expense tracker</Text>
      <Text>{message}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
