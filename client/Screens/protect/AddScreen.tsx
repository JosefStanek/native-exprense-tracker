import Card from "../../components/ui/Card";
import Title from "../../components/ui/Title";
import AddForm from "../../components/reusable/AddForm";
import { useMutation } from "@tanstack/react-query";
import { postExpense } from "../../http/expense-http";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
interface formData {
  name: string;
  amount: string;
  payment: string;
  type: string;
}

const initialData = {
  name: "",
  amount: "",
  payment: { key: "Food", value: "Food" },
  type: { key: "Expenses", value: "Expenses" },
};

const AddScreen: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const { mutate } = useMutation({
    mutationFn: async (data: formData) => {
      const formData = { ...data, userId: user };
      postExpense(formData);
    },
    onSuccess: () => {
      console.log("on success");
    },
    onError: () => {
      console.log("on error");
    },
  });

  const onSubmit = (data: formData) => {
    mutate(data);
  };
  return (
    <Card>
      <Title>New Expense</Title>
      <AddForm initialData={initialData} sendForm={onSubmit} />
    </Card>
  );
};

export default AddScreen;
