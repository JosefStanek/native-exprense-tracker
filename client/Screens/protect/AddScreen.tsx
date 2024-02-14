import Card from "../../components/ui/Card";
import Title from "../../components/ui/Title";
import AddForm from "../../components/reusable/AddForm";
import { useMutation } from "@tanstack/react-query";
import { postExpense } from "../../http/expense-http";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
interface formData {
  name: string;
  amount: string;
  payment: string;
  type: string;
}

const initialData = {
  name: "",
  amount: "",
  payment: { key: "Expenses", value: "Expenses" },
  type: { key: "Food", value: "Food" },
};

interface addScreenProps {
  navigation: any;
}

const AddScreen: React.FC<addScreenProps> = ({ navigation }) => {
  const { user } = useSelector((state: RootState) => state.user);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: formData) => {
      const formData = {
        ...data,
        payment: { key: data.payment, value: data.payment },
        type: { key: data.type, value: data.type },
        userId: user,
      };
      postExpense(formData);
    },
    onSuccess: async () => {
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
      {isPending && <LoadingSpinner />}
      <Title>New Expense</Title>
      <AddForm initialData={initialData} sendForm={onSubmit} />
    </Card>
  );
};

export default AddScreen;
