import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./components/http-auth";
import { Provider } from "react-redux";
import store from "./store/store";
import Navigation from "./components/Navigation";

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Navigation />
      </QueryClientProvider>
    </Provider>
  );
}
