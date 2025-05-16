import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; // this is now the inner content
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import DashboardLayout from "./components/DashboardLayout";
import AddTask from "./pages/AddTask";
import MyTasks from "./pages/MyTasks";
import AvailableTasks from "./pages/AvailableTasks";
import MySubmissions from "./pages/MySubmissions";


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* 🔐 Protected Nested Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} /> {/* /dashboard */}
          <Route path="add-task" element={<AddTask />} />
          <Route path="my-tasks" element={<MyTasks />} />
          <Route path="available-tasks" element={<AvailableTasks />} />
          <Route path="my-submissions" element={<MySubmissions />} />
          <Route path="*" element={<p>404 Not Found</p>} />


        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
