import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { useState } from "react";
import Loader from "./components/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loader setLoading={setLoading} />;
  }

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
