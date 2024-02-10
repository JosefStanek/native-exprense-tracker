import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import React from "react";
import { Colors } from "../../Theme/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
interface ListScreenProps {
  navigation: any;
}
const ListScreen: React.FC<ListScreenProps> = ({ navigation }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const list = [
    { key: "Food", value: "Food", color: Colors.secondary },
    { key: "Fun", value: "Fun", color: Colors.primary },
    { key: "Education", value: "Education", color: Colors.amber },
    { key: "Work", value: "Work", color: Colors.grass },
    { key: "Services", value: "Services", color: Colors.sky },
    { key: "Other", value: "Other", color: Colors.fuchsia },
  ];
  return (
    <View style={styles.screen}>
      <FlatList
        data={list}
        renderItem={(dataItem) => (
          <Pressable
            style={[
              styles.outerContainer,
              { backgroundColor: dataItem.item.color },
            ]}
            android_ripple={{ color: Colors.basicLight }}
            onPress={() => {
              navigation.navigate("listItem", {
                userId: user,
                listId: dataItem.item.value,
                color: dataItem.item.color,
              });
            }}
          >
            <View style={styles.innerContainer}>
              <Text style={styles.title}>{dataItem.item.value}</Text>
              <MaterialIcons name="navigate-next" size={24} color="white" />
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
  outerContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "80%",
    height: 100,
    margin: 10,
    borderRadius: 10,
    elevation: 10,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    textTransform: "uppercase",
    color: Colors.basicLight,
    fontSize: 20,
    fontWeight: "bold",
    textDecorationStyle: "dashed",
    textShadowColor: "black",
    letterSpacing: 2,
  },
});
