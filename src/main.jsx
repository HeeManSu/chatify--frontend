import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { PersistGate } from "redux-persist/integration/react";
// import persistStore from "redux-persist/es/persistStore.js";

const queryClient = new QueryClient();
// export const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ReduxProvider store={store}>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        {/* <PersistGate persistor={persistor}> */}
        <App />
        {/* </PersistGate> */}
      </ChakraProvider>
    </QueryClientProvider>
  </ReduxProvider>
);
