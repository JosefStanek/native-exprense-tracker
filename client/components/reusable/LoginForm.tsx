import { Text, TextInput, StyleSheet, Pressable } from "react-native";
import { Colors } from "../../Theme/colors";
import { useForm, Controller } from "react-hook-form";
interface loginFormProps {
  buttonText: string;
  status: string;
  sendForm: (email: string, password: string, login: boolean) => void;
}

interface formData {
  email: string;
  password: string;
}

const LoginForm: React.FC<loginFormProps> = ({
  buttonText,
  status,
  sendForm,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<formData>();
  const onSubmit = (data: formData) => {
    if (status === "login") {
      sendForm(data.email, data.password, true);
    } else {
      sendForm(data.email, data.password, false);
    }
  };
  return (
    <>
      <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[errors.email ? styles.inputError : styles.input]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
      {errors.email && (
        <Text style={{ color: Colors.secondary }}>Email is required.</Text>
      )}

      <Text style={styles.label}>Password</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={errors.password ? styles.inputError : styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />
      {errors.password && (
        <Text style={{ color: Colors.secondary }}>Password is required.</Text>
      )}

      <Pressable
        style={styles.container}
        onPress={handleSubmit(onSubmit)}
        android_ripple={{ color: Colors.basicLight }}
      >
        <Text style={styles.button}>{buttonText}</Text>
      </Pressable>
    </>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  label: {
    color: Colors.primary,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 20,
    marginVertical: 10,
    padding: 10,
  },
  inputError: {
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 20,
    marginVertical: 10,
    padding: 10,
  },
  container: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingVertical: 15,
    marginVertical: 10,
  },
  button: {
    color: Colors.basicLight,
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 2,
  },
});
