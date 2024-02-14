import Card from "../../components/ui/Card";
import Title from "../../components/ui/Title";
import AddForm from "../../components/reusable/AddForm";
import { useMutation } from "@tanstack/react-query";
import { postExpense } from "../../http/expense-http";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

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
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: transformForm) => {
      postExpense(data);
    },
    onSuccess: async () => {
      console.log("on success");
    },
    onError: () => {
      console.log("on error");
    },
  });

  const onSubmit = (data: transformForm) => {
    mutate(data);
  };
  return (
    <Card>
      {isPending && <LoadingSpinner />}
      <Title>New Expense</Title>
      <AddForm initialData={initialData} sendForm={onSubmit} />
    </Card>
  );
};

export default AddScreen;
