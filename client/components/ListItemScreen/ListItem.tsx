import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import Card from "../ui/Card";
import { Colors } from "../../Theme/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import { useMutation } from "@tanstack/react-query";
import { deleteExpense } from "../../http/expense-http";
interface ListItemProps {
  item: {
    _id: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    amount: string;
    payment: { key: string; value: string };
    type: { key: string; value: string };
    name: string;
  };
  backgroundColor: string;
}

const width = Dimensions.get("window").width;
const itemWidth = width - 100;
const ListItem: React.FC<ListItemProps> = ({ item, backgroundColor }) => {
  const { mutate } = useMutation({
    mutationFn: () => deleteExpense(item._id),
    onSuccess: () => {
      console.log("deleted");
    },
  });
  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.dataContainer}>
            <Text style={styles.title}>Name: {item.name}</Text>
            <Text style={styles.title}>
              Created: {moment(item.createdAt).format("DD.MM.YYYY")}
            </Text>
            <Text style={styles.title}>Type: {item.type.value}</Text>
          </View>
          <View style={styles.iconContainer}>
            <Pressable
              onPress={() => {
                console.log("redirect");
              }}
            >
              <MaterialCommunityIcons
                name="more"
                size={30}
                color={Colors.primary}
              />
            </Pressable>

            <Pressable onPress={() => mutate()}>
              <MaterialCommunityIcons
                name="delete"
                size={30}
                color={Colors.secondary}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    width: itemWidth,
    marginVertical: 20,
    height: 100,
  },
  title: {
    textTransform: "uppercase",
    color: Colors.basicGray,
  },
  innerContainer: {
    flexDirection: "row",
    height: "100%",
    justifyContent: "flex-end",
    marginHorizontal: 20,
  },
  iconContainer: {
    flex: 2,
    justifyContent: "space-around",
  },
  dataContainer: {
    flex: 14,
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 5,
  },
});
