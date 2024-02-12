import { Text, View, ScrollView, StyleSheet } from "react-native";
import Card from "../ui/Card";
import { Colors } from "../../Theme/colors";
import { MaterialIcons } from "@expo/vector-icons";
const CategoryList: React.FC = () => {
  const list = [
    {
      title: "fun",
      icon: <MaterialIcons name="sports-baseball" size={24} color="black" />,
    },
    {
      title: "food",
      icon: <MaterialIcons name="fastfood" size={24} color="black" />,
    },
    {
      title: "services",
      icon: (
        <MaterialIcons name="miscellaneous-services" size={24} color="black" />
      ),
    },
    {
      title: "education",
      icon: <MaterialIcons name="menu-book" size={24} color="black" />,
    },
    {
      title: "work",
      icon: <MaterialIcons name="work" size={24} color="black" />,
    },
    {
      title: "other",
      icon: <MaterialIcons name="flag" size={24} color="black" />,
    },
  ];
  return (
    <Card>
      <Text style={styles.categoryTitle}>Catagories</Text>
      <ScrollView style={styles.catagoeriesContainer}>
        {list.map((item, index) => (
          <View key={index} style={styles.categoryItem}>
            <Text>{item.icon}</Text>
            <Text>{item.title}</Text>
          </View>
        ))}
      </ScrollView>
    </Card>
  );
};

export default CategoryList;
const styles = StyleSheet.create({
  catagoeriesContainer: {
    maxHeight: 130,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
  categoryTitle: {
    textAlign: "center",
    borderBottomWidth: 2,
    borderColor: Colors.amber,
    paddingBottom: 10,
    fontSize: 20,
  },
});
