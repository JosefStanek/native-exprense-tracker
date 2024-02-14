import { useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import AddForm from "../../components/reusable/AddForm";
import Card from "../../components/ui/Card";
import Title from "../../components/ui/Title";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { getExpenseItem } from "../../http/expense-http";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
interface ListItemDetailScreenProps {
  route: any;
  navigation: any;
}
type transformForm = {
  name: string;
  amount: string;
  payment: { key: string; value: string };
  type: { key: string; value: string };
  userId: string;
};

const ListItemDetailScreen: React.FC<ListItemDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { user } = useSelector((state: RootState) => state.user);
  const { expenseId, backgroundColor } = route.params;
  useEffect(() => {
    navigation.setOptions({
      title: "",
      headerStyle: {
        backgroundColor: backgroundColor,
      },
    });
  }, [navigation]);

  const { data, isPending } = useQuery({
    queryKey: ["expensesItem", expenseId],
    queryFn: () => getExpenseItem(user, expenseId),
  });

  const { mutate } = useMutation({
    mutationFn: async (data: transformForm) => {
      console.log("data", data);
    },
  });

  const initialData = {
    name: data?.name,
    amount: data?.amount,
    payment: data?.payment.value,
    type: data?.type.value,
  };
  const onSubmit = (data: any) => {
    mutate(data);
  };

  return (
    <>
      {isPending && <LoadingSpinner />}
      {!data && (
        <Text style={styles.errorMsg}>
          Something went wrong, try again later.
        </Text>
      )}
      {data && (
        <Card>
          <Title>Update</Title>
          <AddForm initialData={initialData} sendForm={onSubmit} />
        </Card>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  errorMsg: {
    textAlign: "center",
    marginVertical: 20,
    textTransform: "uppercase",
  },
});

export default ListItemDetailScreen;
