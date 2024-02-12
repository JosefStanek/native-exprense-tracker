import { Text, View, ScrollView, StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { TextInput } from "react-native-gesture-handler";
import { Colors } from "../../Theme/colors";
import FormButton from "../../components/ui/FormButton";
import { useForm, Controller } from "react-hook-form";
interface formData {
  name: string;
  amount: string;
  payment: string;
  type: string;
}

interface addFormProps {
  sendForm: (data: formData) => void;
  initialData: {
    name: string;
    amount: string;
    payment: any;
    type: any;
  };
}

const AddForm: React.FC<addFormProps> = ({ initialData, sendForm }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<formData>({
    defaultValues: {
      name: initialData.name,
      amount: initialData.amount,
      payment: initialData.payment,
      type: initialData.type,
    },
  });

  const type = [
    { key: "Expenses", value: "Expenses" },
    { key: "Income", value: "Income" },
  ];
  const list = [
    { key: "Food", value: "Food" },
    { key: "Fun", value: "Fun" },
    { key: "Education", value: "Education" },
    { key: "Work", value: "Work" },
    { key: "Services", value: "Services" },
    { key: "Other", value: "Other" },
  ];

  const onSubmit = (data: formData) => {
    sendForm(data);
    reset({
      name: initialData.name,
      amount: initialData.amount,
      payment: initialData.payment,
      type: initialData.type,
    });
  };
  return (
    <ScrollView style={styles.innerContainer}>
      <View>
        <Text style={styles.subtitle}>Name</Text>
        <Controller
          control={control}
          rules={{
            required: true,
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              multiline
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
            />
          )}
          name="name"
        />
        {errors.name && <Text style={styles.error}>Name is required.</Text>}
      </View>

      <View>
        <Text style={styles.subtitle}>Amount</Text>
        <Controller
          control={control}
          rules={{
            required: true,
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              keyboardType="number-pad"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
            />
          )}
          name="amount"
        />
        {errors.amount && <Text style={styles.error}>Amount is required.</Text>}
      </View>
      <View>
        <Text style={styles.subtitle}>Payment</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <SelectList
              setSelected={(val: any) => onChange(val)}
              data={type}
              save="value"
              onSelect={onBlur}
              defaultOption={initialData.payment}
              boxStyles={{
                height: 50,
                borderWidth: 1,
                borderColor: Colors.primary,
                borderRadius: 10,
                padding: 10,
              }}
            />
          )}
          name="payment"
        />
        {errors.payment && (
          <Text style={styles.error}>Payment is required.</Text>
        )}
      </View>
      <View>
        <Text style={styles.subtitle}>Type</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <SelectList
              setSelected={(val: any) => onChange(val)}
              data={list}
              save="value"
              onSelect={onBlur}
              defaultOption={initialData.type}
              boxStyles={{
                height: 50,
                borderWidth: 1,
                borderColor: Colors.primary,
                borderRadius: 10,
                padding: 10,
              }}
            />
          )}
          name="type"
        />
        {errors.type && <Text style={styles.error}>Type is required.</Text>}
      </View>

      <View style={styles.buttonContainer}>
        <FormButton onPress={handleSubmit(onSubmit)}>add</FormButton>
      </View>
    </ScrollView>
  );
};

export default AddForm;

const styles = StyleSheet.create({
  innerContainer: {
    margin: 10,
    padding: 20,
    borderRadius: 8,
  },
  subtitle: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 10,
    padding: 10,
  },
  buttonContainer: {
    marginVertical: 20,
  },
  error: {
    color: Colors.secondary,
  },
});
