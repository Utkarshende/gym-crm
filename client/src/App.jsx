import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import AddMember from "./pages/AddMember";
import EditMember from "./pages/EditMember";
import ViewMember from "./pages/ViewMember";
import Payments from "./pages/Payments";
import Login from "./pages/Login";
import Register from "./pages/Register";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <MainLayout><Dashboard /></MainLayout>
          </PrivateRoute>
        }/>

        <Route path="/add-member" element={
          <PrivateRoute>
            <MainLayout><AddMember /></MainLayout>
          </PrivateRoute>
        }/>

        <Route path="/member/edit/:id" element={
          <PrivateRoute>
            <MainLayout><EditMember /></MainLayout>
          </PrivateRoute>
        }/>

        <Route path="/member/view/:id" element={
          <PrivateRoute>
            <MainLayout><ViewMember /></MainLayout>
          </PrivateRoute>
        }/>

        <Route path="/payments" element={
          <PrivateRoute>
            <MainLayout><Payments /></MainLayout>
          </PrivateRoute>
        }/>

        <Route path="*" element={<Navigate to="/dashboard" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;