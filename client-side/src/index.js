import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* The provider is wrapped in the outer layer of the root component, so that all child components can get the state
        It accepts store as props, and then passes it down through context, so that any component in react can get store through context
    */}

    <Provider store={store}>
      <BrowserRouter>
        {/* Wrap <ChakraProvider> at the root of your app */}
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
