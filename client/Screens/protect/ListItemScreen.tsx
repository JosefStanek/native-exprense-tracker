import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { View, Text, TextInput, StyleSheet, FlatList } from "react-native";
import { getCategoryList } from "../../http/expense-http";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ListItem from "../../components/ListItemScreen/ListItem";
interface ListItemScreenProps {
  route: any;
  navigation: any;
}

const ListItemScreen: React.FC<ListItemScreenProps> = ({
  route,
  navigation,
}) => {
  const userId = route.params.userId;
  const headerColor = route.params.color;
  const headerTitle = route.params.listId;
  useEffect(() => {
    navigation.setOptions({
      headerTitle: headerTitle,
      headerStyle: {
        backgroundColor: headerColor,
      },
    });
  }, [headerColor, headerTitle, navigation]);

  const { data, isPending } = useQuery({
    queryKey: ["category"],
    queryFn: () => getCategoryList(userId, headerTitle),
  });
  return (
    <View style={styles.screen}>
      <View style={[styles.inputContainer, { borderColor: headerColor }]}>
        <TextInput
          style={[styles.input, { borderColor: headerColor }]}
          placeholder="find"
        />
      </View>
      <View style={styles.listContainer}>
        {isPending && <LoadingSpinner />}
        {!data ||
          (data.length === 0 && (
            <Text style={styles.emptyList}>
              You have nothing in this category yet.
            </Text>
          ))}
        {data && (
          <FlatList
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
            data={data}
            keyExtractor={(item) => {
              return item._id;
            }}
            renderItem={(dataItem) => (
              <ListItem item={dataItem.item} backgroundColor={headerColor} />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default ListItemScreen;

const styles = StyleSheet.create({
  screen: { flex: 1 },
  inputContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    marginHorizontal: 20,
  },
  input: {
    borderWidth: 2,
    width: "80%",
    height: 50,
    margin: 30,
    paddingLeft: 20,
    borderRadius: 20,
  },
  listContainer: {
    flex: 8,
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 20,
  },
  emptyList: {
    fontSize: 18,
  },
});
