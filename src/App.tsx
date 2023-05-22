import React from "react"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Spin } from "antd"

import AuthRoutes from "./routes/AuthRoutes"
import { AuthProvider } from "./context/AuthContext"

import Login from "./pages/login"

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<AuthRoutes />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
