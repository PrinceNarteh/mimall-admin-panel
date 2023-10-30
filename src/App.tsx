import { Toaster } from "react-hot-toast";
import Router from "./Router";
import Providers from "./components/providers";

function App() {
  return (
    <Providers>
      <Router />
      <Toaster />
    </Providers>
  );
}

export default App;
