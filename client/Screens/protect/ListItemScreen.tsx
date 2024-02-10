import { useEffect } from "react";
import { View, TextInput } from "react-native";

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
  return (
    <View>
      <TextInput placeholder="filter" />
    </View>
  );
};

export default ListItemScreen;
