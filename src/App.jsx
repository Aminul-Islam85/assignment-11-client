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
          {/* Future routes: <Route path="tasks" element={<TaskList />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
