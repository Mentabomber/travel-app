import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateNewJourney from "./pages/NewJourney";
// import Menu from "./pages/Menu";
import DefaultLayout from "./pages/DefaultLayout";
import { createContext, useEffect, useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
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
              <Route path="/" element={<Home />}></Route>
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
              <Route path="new-journey">
                <Route index element={<CreateNewJourney />}></Route>
                <Route path="user" element={<CreateNewJourney />}></Route>
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </GlobalContext.Provider>
  );
}

export default App;
