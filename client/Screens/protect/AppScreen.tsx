import { View, Text } from "react-native";
import { Colors } from "../../Theme/colors";
import { Entypo } from "@expo/vector-icons";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import PieGraph from "../../components/reusable/PieGraph";
import ExpenseBar from "../../components/AppScreen/ExpenseBar";
import CategoryList from "../../components/AppScreen/CategoryList";
import { useQuery } from "@tanstack/react-query";
import { getTotal } from "../../http/expense-http";
import { ScrollView } from "react-native-gesture-handler";
import Card from "../../components/ui/Card";

interface appScreenProps {
  navigation: any;
}

const AppScreen: React.FC<appScreenProps> = ({ navigation }) => {
  const { user } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ flexDirection: "row", gap: 20 }}>
          <Entypo
            name="squared-plus"
            size={24}
            color={Colors.basicLight}
            style={{ marginLeft: 20 }}
            onPress={() => navigation.navigate("add")}
          />
          <Entypo
            name="list"
            size={24}
            color={Colors.basicLight}
            onPress={() => navigation.navigate("list")}
          />
        </View>
      ),
      headerRight: () => (
        <Entypo
          name="log-out"
          size={24}
          color={Colors.basicLight}
          style={{ marginRight: 20 }}
        />
      ),
    });
  }, [navigation]);

  const { data, isPending } = useQuery({
    queryKey: ["total"],
    queryFn: async () => getTotal(user),
  });

  return (
    <>
      <ScrollView>
        {isPending && <Text>loading</Text>}
        {data && (
          <>
            <ExpenseBar
              totalLength={data.totalLength}
              incomeLength={data.incomeLength}
              expenseLength={data.expenseLength}
            />
            <PieGraph pieData={data} />
            <CategoryList />
          </>
        )}
      </ScrollView>
      {data && data.expenseLength > 0 && (
        <ScrollView horizontal={true}>
          <View>
            <Text>{data.expenses[0].name}</Text>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default AppScreen;
