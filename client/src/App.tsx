import { Signup } from "./pages/Signup";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signin } from "./pages/Signin";
import Dashboard from "./pages/dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route element={<Signup />} path="/signup" />
          <Route element={<Signin />} path="/signin" />
          <Route element={<Dashboard />} path="/dashboard" />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
