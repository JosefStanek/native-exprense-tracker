import { View, Text, ScrollView, StatusBar } from "react-native";
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
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import LastValues from "../../components/AppScreen/LastValues";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/slices/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface appScreenProps {
  navigation: any;
}

const AppScreen: React.FC<appScreenProps> = ({ navigation }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
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
          onPress={() => {
            AsyncStorage.removeItem("token");
            AsyncStorage.removeItem("user");
            dispatch(logoutUser());
          }}
          name="log-out"
          size={24}
          color={Colors.basicLight}
          style={{ marginRight: 20 }}
        />
      ),
    });
  }, [navigation]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["total"],
    queryFn: () => getTotal(user),
  });
  return (
    <>
      <StatusBar backgroundColor={Colors.primary} />
      <ScrollView>
        {isLoading && <LoadingSpinner />}
        {data && (
          <>
            <ExpenseBar expenses={data.expenses} incomes={data.incomes} />

            <PieGraph pieData={data} />

            {data?.total.length > 0 && (
              <>
                <BarGraph barData={data.total} />
                <LastValues expenses={data.expenses} incomes={data.incomes} />
              </>
            )}
          </>
        )}

        {error && (
          <Text style={{ textAlign: "center", marginVertical: 10 }}>
            Something wrong, try again later
          </Text>
        )}
      </ScrollView>
    </>
  );
};

export default AppScreen;
