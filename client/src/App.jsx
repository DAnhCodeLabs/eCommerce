import React from "react";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="bg-[#f7f7f7] flex flex-col w-full min-h-screen">
      <Navbar />
      <div className="flex-1">
        <AppRoutes />
      </div>
    </div>
  );
};

export default App;
