import React, { useState } from "react";
import Register from "./home/Register";
import Login from "./home/Login";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import LeftSide from "./Pages/LeftSide";
import RightSide from "./Pages/RightSide";

interface UserData {
  id: number;
  userName: string;
  email: string;
}

const App: React.FC = () => {
  const [selectedUserData, setSelectedUserData] = useState<UserData | null>(
    null
  );
  console.log(selectedUserData, "slectedUserData");

  return (
    <div className="flex h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <LeftSide setSelectedUserData={setSelectedUserData} />
                <RightSide selectedUserData={selectedUserData} />
                {/* <ChatData/> */}
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
