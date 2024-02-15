import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./http/expense-http";
import { Provider } from "react-redux";
import store from "./store/store";
import Navigation from "./components/Navigation";
import ToastManager from "toastify-react-native";

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Navigation />
        <ToastManager />
      </QueryClientProvider>
    </Provider>
  );
}
