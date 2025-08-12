import { BrowserRouter as Router, RouterProvider } from "react-router-dom";
import "./App.css";

import { routes } from "./routes/routes";
import ChartProvider from "./context/UserContext/Provider";

function App() {
  return (
    <>
      <ChartProvider>
        <RouterProvider router={routes} />;
      </ChartProvider>
    </>
  );
}

export default App;
