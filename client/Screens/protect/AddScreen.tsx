import Card from "../../components/ui/Card";
import Title from "../../components/ui/Title";
import AddForm from "../../components/reusable/AddForm";
import { useMutation } from "@tanstack/react-query";
interface formData {
  name: string;
  amount: string;
  payment: string;
  type: string;
}

const initialData = {
  name: "",
  amount: "",
  payment: { key: "", value: "" },
  type: { key: "", value: "" },
};

const AddScreen: React.FC = () => {
  const { mutate } = useMutation({
    mutationFn: async (data: formData) => {
      console.log(data);
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
