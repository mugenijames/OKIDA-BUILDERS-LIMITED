// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Team from "./pages/TeamMembers";
import Messages from "./pages/Messages";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register";
import { AuthProvider, useAuth } from "./context/AuthContext";

const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app-layout" style={{ display: "flex" }}>
      {isAuthenticated && <Sidebar />}
      <div style={{ flexGrow: 1, padding: "20px" }}>{children}</div>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <PrivateRoute>
                <Projects />
              </PrivateRoute>
            }
          />
          <Route
            path="/team"
            element={
              <PrivateRoute>
                <Team />
              </PrivateRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <PrivateRoute>
                <Messages />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  </AuthProvider>
);

export default App;
