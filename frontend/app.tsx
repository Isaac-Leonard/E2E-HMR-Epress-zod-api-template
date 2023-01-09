import { context } from "./context";
import react from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./error-page";
import { Page } from "./page";
import { Counter } from "./count";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Page title="main">
        <Counter />
      </Page>
    ),
    errorElement: <ErrorPage />,
  },
]);

export default function App() {
  const state = { state: null };
  return (
    <react.StrictMode>
      <context.Provider value={state}>
        <ChakraProvider>
          <RouterProvider router={router} />
        </ChakraProvider>
      </context.Provider>
    </react.StrictMode>
  );
}
