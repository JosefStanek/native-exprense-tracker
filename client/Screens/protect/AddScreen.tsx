import Card from "../../components/ui/Card";
import Title from "../../components/ui/Title";
import AddForm from "../../components/reusable/AddForm";
import { useMutation } from "@tanstack/react-query";
import { postExpense } from "../../http/expense-http";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { StatusBar, Text } from "react-native";
import { Colors } from "../../Theme/colors";

type transformForm = {
  name: string;
  amount: string;
  payment: { key: string; value: string };
  type: { key: string; value: string };
  userId: string;
};

const initialData = {
  name: "",
  amount: "",
  payment: "Expenses",
  type: "Food",
};

const AddScreen: React.FC = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data: any) => {
      await postExpense(data);
    },
  });

  const onSubmit = (data: transformForm) => {
    mutate(data);
  };
  return (
    <>
      <StatusBar backgroundColor={Colors.primary} />
      <Card>
        {isPending && <LoadingSpinner />}
        <Title>New Expense</Title>

        {error && (
          <Text style={{ textAlign: "center", marginVertical: 10 }}>
            Something wrong, try again later
          </Text>
        )}
        {!error && <AddForm initialData={initialData} sendForm={onSubmit} />}
      </Card>
    </>
  );
};

export default AddScreen;
