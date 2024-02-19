import { Text, View, ScrollView, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Colors } from "../../Theme/colors";
import FormButton from "../../components/ui/FormButton";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
interface formData {
  name: string;
  amount: string;
  payment: string;
  type: string;
}

type transformForm = {
  name: string;
  amount: string;
  payment: { key: string; value: string };
  type: { key: string; value: string };
  userId: string;
};

interface addFormProps {
  sendForm: (data: transformForm) => void;
  initialData: {
    name: string;
    amount: string;
    payment: string;
    type: string;
  };
}

const AddForm: React.FC<addFormProps> = ({ initialData, sendForm }) => {
  const { user } = useSelector((state: RootState) => state.user);
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

  const onSubmit = (data: formData) => {
    const formData: transformForm = {
      ...data,
      payment: { key: data.payment, value: data.payment },
      type: { key: data.type, value: data.type },
      userId: user,
    };
    sendForm(formData);
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
            required: "Name is required",
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
            />
          )}
          name="name"
        />
        {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
      </View>

      <View>
        <Text style={styles.subtitle}>Amount</Text>
        <Controller
          control={control}
          rules={{
            required: "Amount is required",
            pattern: {
              value: /^\d+$/,
              message: "Insert number without white space",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              keyboardType="number-pad"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
              maxLength={7}
            />
          )}
          name="amount"
        />
        {errors.amount && (
          <Text style={styles.error}>{errors.amount.message}</Text>
        )}
      </View>

      <View>
        <Text style={styles.subtitle}>Payment</Text>
        <View style={styles.pickerInput}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Picker
                selectedValue={value}
                onValueChange={(itemValue) => onChange(itemValue)}
              >
                <Picker.Item label="Expenses" value="Expenses" />
                <Picker.Item label="Income" value="Income" />
              </Picker>
            )}
            name="payment"
          />
        </View>
      </View>

      <View>
        <Text style={styles.subtitle}>Type</Text>
        <View style={styles.pickerInput}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Picker
                selectedValue={value}
                onValueChange={(itemValue) => onChange(itemValue)}
              >
                <Picker.Item label="Food" value="Food" />
                <Picker.Item label="Fun" value="Fun" />
                <Picker.Item label="Education" value="Education" />
                <Picker.Item label="Work" value="Work" />
                <Picker.Item label="Services" value="Services" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            )}
            name="type"
          />
        </View>
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
  pickerInput: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 10,
  },
  buttonContainer: {
    marginVertical: 20,
  },
  error: {
    color: Colors.secondary,
  },
});
