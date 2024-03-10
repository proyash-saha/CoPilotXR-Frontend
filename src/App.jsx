import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navigation from "./routes/navigation/navigation.component";
import LandingPage from "./components/landing-page/landing-page.component";
import Register from "./routes/register/register.component";
import LogIn from "./routes/log-in/log-in.component";
import Home from "./routes/home/home.component";
import Account from "./routes/account/account.component";

import { UserContext } from "./contexts/user.context";

const PrivateRoute = ({ element, canNavigate }) => {
  return canNavigate ? (
    element
  ) : (
    <Navigate
      to="/"
      replace={true}
      state={{ from: window.location.pathname }}
    />
  );
};

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<LandingPage />} />
        <Route path="register" element={<Register />} />
        <Route path="log-in" element={<LogIn />} />
        <Route
          path="home"
          element={
            <PrivateRoute element={<Home />} canNavigate={user !== null} />
          }
        />
        <Route
          path="account"
          element={
            <PrivateRoute element={<Account />} canNavigate={user !== null} />
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
