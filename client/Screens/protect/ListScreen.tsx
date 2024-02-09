import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Colors } from "../../Theme/colors";

const ListScreen = () => {
  const data2 = [
    { key: "1", value: "Food" },
    { key: "2", value: "Fun" },
    { key: "3", value: "Education" },
    { key: "4", value: "Work" },
    { key: "5", value: "Services" },
    { key: "6", value: "Other" },
  ];
  return (
    <View style={styles.screen}>
      <View style={{ flex: 1, width: 200, height: 200 }}>
        <Pressable style={styles.expenses} android_ripple={{ color: "white" }}>
          <Text style={styles.title}>Expenses</Text>
        </Pressable>
      </View>
      <View style={{ flex: 1 }}>
        <Pressable style={styles.expenses} android_ripple={{ color: "white" }}>
          <Text style={styles.title}>Expenses</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: 10,
  },
  expenses: {
    borderWidth: 1,
    backgroundColor: Colors.primary,
    padding: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  income: {
    borderWidth: 1,
    backgroundColor: Colors.secondary,
    margin: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textTransform: "uppercase",
    fontSize: 10,
    fontWeight: "bold",
    color: Colors.basicLight,
  },
});
