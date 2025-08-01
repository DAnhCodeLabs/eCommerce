import React from "react";
import { useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

const App = () => {
  const location = useLocation();
  const hideLayout = ["/login", "/signin"].includes(location.pathname);

  return (
    <div className="bg-background-main/60 flex flex-col w-full min-h-screen">
      {!hideLayout && <Navbar />}
      <div className="flex-1">
        <AppRoutes />
      </div>
      {!hideLayout && <Footer />}
    </div>
  );
};

export default App;
