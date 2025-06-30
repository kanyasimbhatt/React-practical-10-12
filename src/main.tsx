import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import GeneralProvider from "./Components/Tasks/GeneralProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <GeneralProvider>
    <App />
  </GeneralProvider>,
);
