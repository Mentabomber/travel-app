import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
// import Menu from "./pages/Menu";
import DefaultLayout from "./pages/DefaultLayout";
import { createContext, useEffect, useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import PrivateRoutes from "./middlewares/PrivateRoutes";
// import RoleAccess from "./middlewares/RoleAccess";
import GuestRoutes from "./middlewares/GuestRoutes";
// import NotFound from "./pages/NotFound";
import GenericError from "./pages/GenericError";
import "./css/index.css";

// creiamo un context globale e lo esporto per poterlo usare in altri componenti
export const GlobalContext = createContext();

function App() {
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("light");

  return (
    <GlobalContext.Provider
      value={{ counter, setCounter, loading, setLoading, theme, setTheme }}
    >
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              element={<DefaultLayout />}
              errorElement={<GenericError></GenericError>}
            >
              <Route
                path="/"
                element={<Home />}
                errorElement={<GenericError></GenericError>}
              ></Route>
              <Route
                path="/login"
                element={
                  <GuestRoutes>
                    <Login />
                  </GuestRoutes>
                }
              ></Route>
              <Route
                path="/register"
                element={
                  <GuestRoutes>
                    <Register />
                  </GuestRoutes>
                }
              ></Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </GlobalContext.Provider>
  );
}

export default App;
