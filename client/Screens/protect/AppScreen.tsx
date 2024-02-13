import { View, Text, ScrollView } from "react-native";
import { Colors } from "../../Theme/colors";
import { Entypo } from "@expo/vector-icons";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import PieGraph from "../../components/AppScreen/PieGraph";
import ExpenseBar from "../../components/AppScreen/ExpenseBar";
import { useQuery } from "@tanstack/react-query";
import { getTotal } from "../../http/expense-http";
import BarGraph from "../../components/AppScreen/BarGraph";
import Card from "../../components/ui/Card";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
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
    <ScrollView>
      {isPending && <LoadingSpinner />}
      {data && (
        <>
          <ExpenseBar expenses={data.expenses} incomes={data.incomes} />

          <PieGraph pieData={data} />
          <BarGraph barData={data.total} />

          <Card>
            <Text>Last Expense: </Text>
            <Text>Last Income: </Text>
          </Card>
        </>
      )}
    </ScrollView>
  );
};

export default AppScreen;
